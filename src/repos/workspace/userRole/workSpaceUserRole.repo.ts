import { DataSource } from 'typeorm';
import { WorkSpaceRoles } from '../../../db/entities/WorkSpaceRoles';
import { WorkSpaceUser } from '../../../db/entities/WorkSpaceUser';

export function getWorkSpaceUserRoleRepo(db: DataSource) {

  const workSpaceRolesRepository = db.getRepository(WorkSpaceRoles);
  const workSpaceUserRepository = db.getRepository(WorkSpaceUser);

  return{
    async giveRoleToUser(userId: string,workSpaceId:string, roleValue: string): Promise<WorkSpaceUser> {
      const user = await workSpaceUserRepository.findOneOrFail({ where: { userId,workSpaceId}, relations:{roles:true}});
      user.roles = [...(user.roles ? user.roles : []), await workSpaceRolesRepository.findOneOrFail({ where: { name: roleValue } })];
      return await workSpaceUserRepository.save(user);
    },
    async removeRoleFromUser(userId: string,workSpaceId:string, roleValue: string): Promise<WorkSpaceUser> {
      const user = await workSpaceUserRepository.findOneOrFail({ where: { userId,workSpaceId}, relations:{roles:true}});
      user.roles = user.roles.filter((role) => role.name !== roleValue);
      return await workSpaceUserRepository.save(user);
    },
    async getAllUserRole(userId: string,workSpaceId:string): Promise<WorkSpaceRoles[]>{
      const user = await workSpaceUserRepository.findOneOrFail({where:{userId,workSpaceId},relations:{roles:{permissions:true}}});
      return user.roles
    }
  }

}