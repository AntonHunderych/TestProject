import { DataSource, EntityManager } from 'typeorm';
import { RoleEntity } from '../../services/typeorm/entities/RoleEntity';
import { DBError } from '../../types/errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';

export interface IRolesRepo extends IRecreateRepo {
  getRoleByValue(value: string): Promise<RoleEntity>;
  addRole(role: Partial<RoleEntity>): Promise<RoleEntity>;
  getAllRoles(): Promise<RoleEntity[]>;
  deleteRole(id: string): Promise<boolean>;
}

export default function getRolesRepo(db: DataSource | EntityManager): IRolesRepo {
  const roleRepo = db.getRepository(RoleEntity);

  return {
    getRoleByValue: async (value: string): Promise<RoleEntity> => {
      try {
        return await roleRepo.findOneOrFail({ where: { value } });
      } catch (error) {
        throw new DBError('Error fetching role by value', error);
      }
    },
    addRole: async (role: { value: string; description?: string }): Promise<RoleEntity> => {
      try {
        return await roleRepo.save(role);
      } catch (error) {
        throw new DBError('Error adding role', error);
      }
    },
    getAllRoles: async (): Promise<RoleEntity[]> => {
      try {
        return await roleRepo.find({ relations: ['users'] });
      } catch (error) {
        throw new DBError('Error fetching all roles', error);
      }
    },
    deleteRole: async (value: string): Promise<boolean> => {
      try {
        const role = await roleRepo.findOneOrFail({ where: { value } });
        return !!(await roleRepo.remove(role));
      } catch (error) {
        throw new DBError('Error deleting role', error);
      }
    },
    __recreateFunction: getRolesRepo,
  };
}
