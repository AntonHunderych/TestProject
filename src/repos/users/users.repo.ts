import { DataSource, EntityManager } from 'typeorm';
import { UserEntity } from '../../services/typeorm/entities/UserEntity';
import { DBError } from '../../types/errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';

export interface IUserRepo extends IRecreateRepo {
  getAllUsers(): Promise<UserEntity[]>;
  getUserById(id: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity | null>;
  createUser(userData: Partial<UserEntity>): Promise<UserEntity>;
  updateUser(id: string, userData: Partial<UserEntity>): Promise<UserEntity>;
  deleteUser(id: string): Promise<boolean>;
}

export function getUserRepo(db: DataSource | EntityManager): IUserRepo {
  const _usersRepo = db.getRepository(UserEntity);

  return {
    getAllUsers: async () => {
      try {
        return await _usersRepo.find();
      } catch (error) {
        throw new DBError('Error fetching all users', error);
      }
    },

    getUserById: async (id: string): Promise<UserEntity> => {
      try {
        return await _usersRepo.findOneOrFail({
          where: { id },
          relations: {
            todos: { tags: { tag: true } },
            tags: true,
            wsUsers: { workSpace: true },
          },
        });
      } catch (error) {
        throw new DBError('Error fetching user by id', error);
      }
    },

    async getUserByEmail(email: string): Promise<UserEntity | null> {
      try {
        return await _usersRepo.findOne({ where: { email } });
      } catch (error) {
        throw new DBError('Error fetching user by email', error);
      }
    },

    createUser: async (userData: Partial<UserEntity>) => {
      try {
        const newUser = _usersRepo.create(userData);
        return await _usersRepo.save(newUser);
      } catch (error) {
        throw new DBError('Error creating user', error);
      }
    },

    updateUser: async (id: string, userData: Partial<UserEntity>) => {
      try {
        const user = await _usersRepo.findOneOrFail({ where: { id } });
        Object.assign(user, userData);
        return await _usersRepo.save(user);
      } catch (error) {
        throw new DBError('Error updating user', error);
      }
    },

    deleteUser: async (id: string) => {
      try {
        const user = await _usersRepo.findOne({ where: { id } });
        if (!user) {
          return false;
        }
        await _usersRepo.remove(user);
        return true;
      } catch (error) {
        throw new DBError('Error deleting user', error);
      }
    },
    __recreateFunction: getUserRepo,
  };
}
