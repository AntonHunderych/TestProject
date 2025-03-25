import { DataSource, EntityManager } from 'typeorm';
import { User } from '../../db/entities/UserEntity';
import { DBError } from '../../types/Errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';

export interface IUsersRepos extends IRecreateRepo {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(userData: Partial<User>): Promise<User>;
  updateUser(id: string, userData: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<boolean>;
}

export function getUserRepo(db: DataSource | EntityManager): IUsersRepos {
  const _usersRepo = db.getRepository(User);

  return {
    getAllUsers: async () => {
      try {
        return await _usersRepo.find();
      } catch (error) {
        throw new DBError('Error fetching all users', error);
      }
    },

    getUserById: async (id: string): Promise<User> => {
      try {
        return await _usersRepo.findOneOrFail({
          where: { id },
          relations: {
            roles: true,
            todos: true,
          },
        });
      } catch (error) {
        throw new DBError('Error fetching user by id', error);
      }
    },

    async getUserByEmail(email: string): Promise<User | null> {
      try {
        return await _usersRepo.findOne({ where: { email }, relations: ['roles'] });
      } catch (error) {
        throw new DBError('Error fetching user by email', error);
      }
    },

    createUser: async (userData: Partial<User>) => {
      try {
        const newUser = _usersRepo.create(userData);
        return await _usersRepo.save(newUser);
      } catch (error) {
        throw new DBError('Error creating user', error);
      }
    },

    updateUser: async (id: string, userData: Partial<User>) => {
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
