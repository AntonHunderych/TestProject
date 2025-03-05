import { DataSource } from "typeorm";
import {User} from "../../db/entities/UserEntity";


export interface IUsersRepos {
    getAllUsers: () => Promise<User[]>;
    getUserById: (id: string) => Promise<User | null>;
    createUser: (userData: Partial<User>) => Promise<User>;
    updateUser: (id: string, userData: Partial<User>) => Promise<User | null>;
    deleteUser: (id: string) => Promise<boolean>;
}

export function getUserRepos(db: DataSource): IUsersRepos {
    const _usersRepo = db.getRepository(User);

    return {
        getAllUsers: async () => {
            return await _usersRepo.find();
        },

        getUserById: async (id: string) => {
            return await _usersRepo.findOneOrFail({ where: { id } });
        },

        createUser: async (userData: Partial<User>) => {
            const newUser = _usersRepo.create(userData);
            return await _usersRepo.save(newUser);
        },

        updateUser: async (id: string, userData: Partial<User>) => {
            const user = await _usersRepo.findOneOrFail({ where: { id } });
            Object.assign(user, userData);
            return await _usersRepo.save(user);
        },

        deleteUser: async (id: string) => {
            const user = await _usersRepo.findOne({ where: { id } });
            if (!user) return false;

            await _usersRepo.remove(user);
            return true;
        }
    };
}
