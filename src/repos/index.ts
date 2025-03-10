import { DataSource } from 'typeorm';
import { getUserRepo } from './users/users.repos';
import { userRoleRepo } from './user-role/user-role.repo';
import getRolesRepo from './roles/roles.repos';
import { getTodosRepo } from './todos/todos.repo';
import { getCommentsRepo } from './comments/comments.repos';

export default function getRepos(db: DataSource) {
  return {
    userRepo: getUserRepo(db),
    roleRepo: getRolesRepo(db),
    userRoleRepo: userRoleRepo(db),
    todoRepo: getTodosRepo(db),
    commentRepo: getCommentsRepo(db),
  };
}

export type IRepos = ReturnType<typeof getRepos>;
