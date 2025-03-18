import { DataSource } from 'typeorm';
import { Role } from '../../db/entities/RoleEntity';
import { DBError } from '../../Types/Errors/DBError';

export interface IRolesRepo {
  getRoleByValue(value: string): Promise<Role>;
  addRole(role: { value: string; description?: string }): Promise<Role>;
  getAllRoles(): Promise<Role[]>;
  deleteRole(id: string): Promise<boolean>;
}

export default function getRolesRepo(db: DataSource): IRolesRepo {
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
    deleteRole: async (id: string): Promise<boolean> => {
      try {
        const role = await roleRepo.findOne({ where: { id } });
        if (!role) {
          return false;
        }
        await roleRepo.remove(role);
        return true;
      } catch (error) {
        throw new DBError('Error deleting role', error);
      }
    },
  };
}
