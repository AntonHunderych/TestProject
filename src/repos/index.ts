import { DataSource } from 'typeorm';
import { getUserRepo } from './users/users.repos';
import { getUserRoleRepo } from './user-role/getUserRoleRepo';
import getRolesRepo from './roles/roles.repos';

export default function getRepos(db: DataSource) {
  return {
    userRepo: getUserRepo(db),
    roleRepo: getRolesRepo(db),
    userRoleRepo: getUserRoleRepo(db),
  };
}

export type IRepos = ReturnType<typeof getRepos>;
