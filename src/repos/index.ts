import { DataSource, EntityManager } from 'typeorm';
import { getUserRepo } from './users/users.repo';
import { getUserRoleRepo } from './userRole/userRole.repo';
import getRolesRepo from './roles/roles.repo';
import { getTodosRepo } from './todos/todos.repo';
import { getCommentsRepo } from './comments/comments.repo';
import { getWorkSpaceRepos } from './workspace/workspace.repo';
import { getWorkSpaceTodoRepo } from './workspace/todos/workSpaceTodos.repo';
import { getWorkSpaceUserRepo } from './workspace/user/workSpaceUser.repo';
import { getWorkSpaceRolesRepo } from './workspace/roles/workSpaceRoles.repo';
import { getWorkSpacePermissionsRepo } from './workspace/permissions/workSpacePermissions.repo';
import { getWorkSpaceUserRoleRepo } from './workspace/userRole/workSpaceUserRole.repo';
import { getTodoContributorRepo } from './workspace/todoContributor/todoContributor.repo';
import { getWorkSpaceCommentRepos } from './workspace/comments/comments.repo';
import { getTagsRepos } from './tags/tags.repo';
import { getWorkSpaceTagRepo } from './workspace/tags/workSpaceTags.repos';
import { getWorkSpaceCategoriesRepo } from './workspace/categories/workSpaceCategories.repo';
import { getWorkSpaceCommands } from './workspace/commands/workSpaceCommand.repo';
import { getWorkSpaceCommandsTodoRepo } from './workspace/commandsTodo/workSpaceCommandsTodo.repo';
import { getTokenRepo } from './token/token.repo';

export default function getRepos(db: DataSource | EntityManager) {

  return {
    userRepo: getUserRepo(db),
    roleRepo: getRolesRepo(db),
    userRoleRepo: getUserRoleRepo(db),
    todoRepo: getTodosRepo(db),
    commentRepo: getCommentsRepo(db),
    tagRepo: getTagsRepos(db),
    tokenRepo: getTokenRepo(db),
    workSpaceRepo: getWorkSpaceRepos(db),
    workSpaceTodoRepo: getWorkSpaceTodoRepo(db),
    workSpaceUserRepo: getWorkSpaceUserRepo(db),
    workSpaceRolesRepo: getWorkSpaceRolesRepo(db),
    workSpacePermissionsRepo: getWorkSpacePermissionsRepo(db),
    workSpaceUserRoleRepo: getWorkSpaceUserRoleRepo(db),
    workSpaceContributorRepo: getTodoContributorRepo(db),
    workSpaceCommentRepo: getWorkSpaceCommentRepos(db),
    workSpaceTagRepo: getWorkSpaceTagRepo(db),
    workSpaceCategoriesRepo: getWorkSpaceCategoriesRepo(db),
    workSpaceCommandRepo: getWorkSpaceCommands(db),
    workSpaceCommandsTodoRepo: getWorkSpaceCommandsTodoRepo(db),

  };
}

export type IRepos = ReturnType<typeof getRepos>;
