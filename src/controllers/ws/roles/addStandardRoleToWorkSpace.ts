import { IWorkSpaceRolesRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { Permissions } from '../../../types/enum/PermisionsEnum';
import { createRole } from './createRole';
import { updatePermissionOnRole } from './updatePermissionOnRole';

const rolePermissions: Record<string, Permissions[]> = {
  Creator: [
    Permissions.createTodo,
    Permissions.deleteTodo,
    Permissions.changeTodo,
    Permissions.addPerformersTodo,
    Permissions.removePerformersTodo,
    Permissions.deleteWorkSpace,
    Permissions.changeWorkSpace,
    Permissions.addUserToWorkSpace,
    Permissions.deleteUserFromWorkSpace,
    Permissions.createRole,
    Permissions.deleteRole,
    Permissions.updateRole,
    Permissions.assignRole,
    Permissions.revokeRole,
    Permissions.createTag,
    Permissions.deleteTag,
    Permissions.changeTag,
    Permissions.createCategory,
    Permissions.deleteCategory,
    Permissions.changeCategory,
    Permissions.attachFile,
    Permissions.deleteFile,
    Permissions.updateFile,
    Permissions.manageNotifications,
    Permissions.changeSettings,
    Permissions.writeComment,
    Permissions.changeComment,
    Permissions.deleteComment,
  ],
  User: [
    Permissions.createTodo,
    Permissions.changeTodo,
    Permissions.addPerformersTodo,
    Permissions.removePerformersTodo,
    Permissions.writeComment,
    Permissions.changeComment,
    Permissions.deleteComment,
    Permissions.attachFile,
    Permissions.deleteFile,
    Permissions.updateFile,
    Permissions.createTag,
    Permissions.deleteTag,
    Permissions.changeTag,
    Permissions.createCategory,
    Permissions.deleteCategory,
    Permissions.changeCategory,
    Permissions.manageNotifications,
  ],
  Visitor: [Permissions.writeComment, Permissions.changeComment, Permissions.deleteComment],
};

export async function addStandardRoleToWorkSpace(
  workSpaceRoleRepo: IWorkSpaceRolesRepo,
  workSpaceId: string,
): Promise<void> {
  await createRole(workSpaceRoleRepo, workSpaceId, 'Creator');
  await createRole(workSpaceRoleRepo, workSpaceId, 'User');
  await createRole(workSpaceRoleRepo, workSpaceId, 'Visitor');

  for (const [role, permissions] of Object.entries(rolePermissions)) {
    await updatePermissionOnRole(workSpaceRoleRepo, workSpaceId, role, permissions);
  }
}
