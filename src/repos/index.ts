import { DataSource } from 'typeorm';
import { getUserRepo } from './users/users.repo';
import { userRoleRepo } from './user-role/user-role.repo';
import getRolesRepo from './roles/roles.repo';
import { getTodosRepo } from './todos/todos.repo';
import { getCommentsRepo } from './comments/comments.repo';
import { getWorkSpaceRepos } from './workspace/workspace.repo';
import { getWorkSpaceTodoRepo } from './workspace/todos/workSpaceTodos.repo';
import { getWorkSpaceUserRepo } from './workspace/user/workSpaceUser.repo';
import { getWorkSpaceRoles } from './workspace/roles/workSpaceRoles.repo';
import { getWorkSpacePermissionsRepo } from './workspace/permissions/workSpacePermissions.repo';
import { getWorkSpaceUserRoleRepo } from './workspace/userRole/workSpaceUserRole.repo';
import { getTodoContributorRepo } from './workspace/todoContributor/todoContributor.repo';
import { getWorkSpaceCommentRepos } from './workspace/comments/comments.repo';

export default function getRepos(db: DataSource) {
  return {
    userRepo: getUserRepo(db),
    roleRepo: getRolesRepo(db),
    userRoleRepo: userRoleRepo(db),
    todoRepo: getTodosRepo(db),
    commentRepo: getCommentsRepo(db),
    workSpaceRepo: getWorkSpaceRepos(db),
    workSpaceTodoRepo: getWorkSpaceTodoRepo(db),
    workSpaceUserRepo: getWorkSpaceUserRepo(db),
    workSpaceRolesRepo: getWorkSpaceRoles(db),
    workSpacePermissionsRepo: getWorkSpacePermissionsRepo(db),
    workSpaceUserRoleRepo: getWorkSpaceUserRoleRepo(db),
    workSpaceContributorRepo: getTodoContributorRepo(db),
    workSpaceCommentRepo: getWorkSpaceCommentRepos(db),
  };
}

export type IRepos = ReturnType<typeof getRepos>;
