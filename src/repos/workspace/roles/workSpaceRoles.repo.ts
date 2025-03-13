import { DataSource } from 'typeorm';
import { WorkSpaceRoles } from '../../../db/entities/WorkSpaceRoles';
import { Permissions } from '../../../Types/Enum/PermisionsEnum';
import { WorkSpacePermissions } from '../../../db/entities/WorkSpacePermissions';

export interface IWorkSpaceRolesRepo {

  create(workSpaceId: string,name:string): Promise<WorkSpaceRoles>
  delete(workSpaceId: string,name:string): Promise<boolean>
  getAll(): Promise<WorkSpaceRoles[]>
  getWorkSpacePermissions(workSpaceId: string): Promise<WorkSpaceRoles[]>
  updatePermissionOnRole(workSpaceId: string, name:string, permissionsValue: Permissions[]): Promise<WorkSpaceRoles>
}

export function getWorkSpaceRoles(db:DataSource): IWorkSpaceRolesRepo {

  const workSpaceRolesRepo = db.getRepository(WorkSpaceRoles)
  const workSpacePermissions = db.getRepository(WorkSpacePermissions)

  return {
    async getAll(): Promise<WorkSpaceRoles[]>{
      return await workSpaceRolesRepo.find()
    },
    async getWorkSpacePermissions(workSpaceId: string): Promise<WorkSpaceRoles[]>{
      return await workSpaceRolesRepo.find({where:{workSpaceId}})
    },
    async create(workSpaceId: string, name: string): Promise<WorkSpaceRoles> {
      return await workSpaceRolesRepo.save({name: name, workSpaceId: workSpaceId});
    },
    async delete(workSpaceId: string, name:string): Promise<boolean>{
      return !!(await workSpaceRolesRepo.delete([name,workSpaceId]));
    },
    async updatePermissionOnRole(workSpaceId: string, name:string, permissionsValue: Permissions[]): Promise<WorkSpaceRoles> {
      const permissions = await Promise.all(
        permissionsValue.map(value => workSpacePermissions.findOneOrFail({ where: { value } }))
      );

      const role = await workSpaceRolesRepo.findOneOrFail({
        where: { workSpaceId, name },
        relations: { permissions: true }
      });

      role.permissions = permissions;
      return workSpaceRolesRepo.save(role)
    }
  }

}