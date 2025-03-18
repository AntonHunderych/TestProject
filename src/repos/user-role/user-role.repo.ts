import { DataSource } from 'typeorm';
import { User } from '../../db/entities/UserEntity';
import { Role } from '../../db/entities/RoleEntity';
import { DBError } from '../../Types/Errors/DBError';

export interface IUserRoleRepo {
  giveRoleToUser(userId: string, roleValue: string): Promise<boolean>;
  removeRoleFromUser(userID: string, roleValue: string): Promise<boolean>;
}

export function userRoleRepo(db: DataSource) {
  const userRepo = db.getRepository(User);
  const roleRepo = db.getRepository(Role);

  function checkRoleInUser(user: User, roleValue: string): boolean {
    return user.roles.some((userRole) => userRole.value === roleValue);
  }

  return {
    async giveRoleToUser(userId: string, roleValue: string): Promise<boolean> {
      try {
        const user = await userRepo.findOneOrFail({ where: { id: userId }, relations: ['roles'] });
        user.roles = [...(user.roles ? user.roles : []), await roleRepo.findOneOrFail({ where: { value: roleValue } })];

        const newUser = await userRepo.save(user);
        return checkRoleInUser(newUser, roleValue);
      } catch (error) {
        throw new DBError('Error giving role to user', error);
      }
    },
    async removeRoleFromUser(userID: string, roleValue: string): Promise<boolean> {
      try {
        const user = await userRepo.findOneOrFail({ where: { id: userID }, relations: ['roles'] });
        user.roles = user.roles.filter((roleId) => roleId.value !== roleValue);

        const newUser = await userRepo.save(user);
        return !checkRoleInUser(newUser, roleValue);
      } catch (error) {
        throw new DBError('Error removing role from user', error);
      }
    },
  };
}
