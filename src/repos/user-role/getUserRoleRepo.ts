import { DataSource } from 'typeorm';
import { User } from '../../db/entities/UserEntity';
import { Role } from '../../db/entities/RoleEntity';

export interface IUserRoleRepo {
  giveRoleToUser(userId: string, roleValue: string): Promise<boolean>;
  removeRoleFromUser(userID: string, roleValue: string): Promise<boolean>;
}

export function getUserRoleRepo(db: DataSource) {
  const userRepo = db.getRepository(User);
  const roleRepo = db.getRepository(Role);

  function checkRoleInUser(user: User, roleValue: string): boolean {
    return user.roles.some((userRole) => userRole.value === roleValue);
  }

  return {
    async giveRoleToUser(userId: string, roleValue: string): Promise<boolean> {
      const user = await userRepo.findOneOrFail({ where: { id: userId }, relations: ['roles'] });
      user.roles = [...(user.roles ? user.roles : []), await roleRepo.findOneOrFail({ where: { value: roleValue } })];

      const newUser = await userRepo.save(user);
      return checkRoleInUser(newUser, roleValue);
    },
    async removeRoleFromUser(userID: string, roleValue: string): Promise<boolean> {
      const user = await userRepo.findOneOrFail({ where: { id: userID }, relations: ['roles'] });
      user.roles = user.roles.filter((roleId) => roleId.value !== roleValue);

      const newUser = await userRepo.save(user);
      return !checkRoleInUser(newUser, roleValue);
    },
  };
}
