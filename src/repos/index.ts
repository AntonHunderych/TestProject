import { DataSource } from 'typeorm';
import { getUserRepo } from './users/users.repo';
import { getUserRoleRepo } from './userRole/userRole.repo';
import getRoleRepo from './roles/roles.repo';
import { getTodoRepo } from './todos/todos.repo';
import { getCommentRepo } from './comments/comments.repo';
import { getWorkSpaceRepos } from './workspace/workspace.repo';
import { getWorkSpaceTodoRepo } from './workspace/todos/workSpaceTodos.repo';
import { getWorkSpaceUserRepo } from './workspace/user/workSpaceUser.repo';
import { getWorkSpaceRoleRepo } from './workspace/roles/workSpaceRoles.repo';
import { getWorkSpacePermissionRepo } from './workspace/permissions/workSpacePermissions.repo';
import { getWorkSpaceUserRoleRepo } from './workspace/userRole/workSpaceUserRole.repo';
import { getTodoContributorRepo } from './workspace/todoContributor/todoContributor.repo';
import { getWorkSpaceCommentRepos } from './workspace/comments/workSpaceComments.repo';
import { getTagRepo } from './tags/tags.repo';
import { getWorkSpaceTagRepo } from './workspace/tags/workSpaceTags.repo';
import { getWorkSpaceCategoryRepo } from './workspace/categories/workSpaceCategories.repo';
import { getWorkSpaceCommandRepo } from './workspace/commands/workSpaceCommand.repo';
import { getWorkSpaceCommandTodoRepo } from './workspace/commandsTodo/workSpaceCommandsTodo.repo';
import { getTokenRepo } from './token/token.repo';
import { getTodoTagRepo } from './todoTag/todoTag.repo';
import { getWorkSpaceRolePermissionRepo } from './workspace/rolePermission/workSpaceRolePermission.repo';
import { getWorkSpaceUserCommandRepo } from './workspace/userCommand/workSpaceUserCommand.repo';
import { getWorkSpaceTagTodoRepo } from './workspace/tagTodo/workSpaceTagTodo.repo';
import { getWorkSpaceInviteLinkRepo } from './workspace/inviteLink/inviteLink.repo';
import { getWorkSpaceGoogleCalendarTokenRepo } from './workspace/googleCalendarToken/workSpaceGoogleCalendarToken.repo';
import { getWorkSpaceGoogleCalendarEventRepo } from './workspace/googleCalendarEvent/workSpaceGoogleCalendarEvent';
import { getWorkSpaceFileRepo } from './workspace/files/workSpaceFile.repo';
import { getPaymentHistoryRepo } from './payment/paymentHistory.repo';
import { getPaymentErrorRepo } from './payment/paymentError.repo';
import { getPaymentProductRepo } from './payment/paymentProduct.repo';
import { getUserLimitRepo } from './limits/userLimits.repo';
import { getLimitChangeRepo } from './limits/limitsChange.repo';

export default function getRepos(db: DataSource) {
  return {
    userRepo: getUserRepo(db),
    roleRepo: getRoleRepo(db),
    userRoleRepo: getUserRoleRepo(db),
    todoRepo: getTodoRepo(db),
    commentRepo: getCommentRepo(db),
    tagRepo: getTagRepo(db),
    todoTagRepo: getTodoTagRepo(db),
    tokenRepo: getTokenRepo(db),
    workSpaceRepo: getWorkSpaceRepos(db),
    workSpaceTodoRepo: getWorkSpaceTodoRepo(db),
    workSpaceUserRepo: getWorkSpaceUserRepo(db),
    workSpaceRoleRepo: getWorkSpaceRoleRepo(db),
    workSpacePermissionRepo: getWorkSpacePermissionRepo(db),
    workSpaceUserRoleRepo: getWorkSpaceUserRoleRepo(db),
    workSpaceContributorRepo: getTodoContributorRepo(db),
    workSpaceCommentRepo: getWorkSpaceCommentRepos(db),
    workSpaceTagRepo: getWorkSpaceTagRepo(db),
    workSpaceCategoryRepo: getWorkSpaceCategoryRepo(db),
    workSpaceCommandRepo: getWorkSpaceCommandRepo(db),
    workSpaceCommandTodoRepo: getWorkSpaceCommandTodoRepo(db),
    workSpaceRolePermissionRepo: getWorkSpaceRolePermissionRepo(db),
    workSpaceUserCommandRepo: getWorkSpaceUserCommandRepo(db),
    workSpaceTagTodoRepo: getWorkSpaceTagTodoRepo(db),
    workSpaceInviteLinkRepo: getWorkSpaceInviteLinkRepo(db),
    workSpaceGoogleCalendarTokenRepo: getWorkSpaceGoogleCalendarTokenRepo(db),
    workSpaceGoogleCalendarEventRepo: getWorkSpaceGoogleCalendarEventRepo(db),
    workSpaceFileRepo: getWorkSpaceFileRepo(db),
    paymentHistoryRepo: getPaymentHistoryRepo(db),
    paymentErrorRepo: getPaymentErrorRepo(db),
    paymentProductRepo: getPaymentProductRepo(db),
    userLimitRepo: getUserLimitRepo(db),
    limitChangeRepo: getLimitChangeRepo(db),
  };
}

export type IRepos = ReturnType<typeof getRepos>;
