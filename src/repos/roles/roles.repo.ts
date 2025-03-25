import { DataSource, EntityManager } from 'typeorm';
import { Role } from '../../db/entities/RoleEntity';
import { DBError } from '../../types/Errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';

export interface IRolesRepo extends IRecreateRepo {
  getRoleByValue(value: string): Promise<Role>;
  addRole(role: Partial<Role>): Promise<Role>;
  getAllRoles(): Promise<Role[]>;
  deleteRole(id: string): Promise<boolean>;
}

export default function getRolesRepo(db: DataSource | EntityManager): IRolesRepo {
  const roleRepo = db.getRepository(Role);

  return {
    getRoleByValue: async (value: string): Promise<Role> => {
      try {
        return await roleRepo.findOneOrFail({ where: { value } });
      } catch (error) {
        throw new DBError('Error fetching role by value', error);
      }
    },
    addRole: async (role: { value: string; description?: string }): Promise<Role> => {
      try {
        return await roleRepo.save(role);
      } catch (error) {
        throw new DBError('Error adding role', error);
      }
    },
    getAllRoles: async (): Promise<Role[]> => {
      try {
        return await roleRepo.find({ relations: ['users'] });
      } catch (error) {
        throw new DBError('Error fetching all roles', error);
      }
    },
    deleteRole: async (value: string): Promise<boolean> => {
      try {
        const role = await roleRepo.findOne({ where: { value } });
        if (!role) {
          return false;
        }
        await roleRepo.remove(role);
        return true;
      } catch (error) {
        throw new DBError('Error deleting role', error);
      }
    },
    __recreateFunction: getRolesRepo,
  };
}
