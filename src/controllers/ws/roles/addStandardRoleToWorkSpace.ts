import { IWorkSpaceRoleRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { Permissions } from '../../../types/enum/PermisionsEnum';
import { createRole } from './createRole';
import { _updatePermissionOnRole } from './_updatePermissionOnRole';
import { IWorkSpaceRolePermissionRepo } from '../../../repos/workspace/rolePermission/workSpaceRolePermission.repo';
import { IWorkSpaceRole } from '../../../types/entities/WorkSpace/WorkSpaceRolesSchema';

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
  workSpaceRoleRepo: IWorkSpaceRoleRepo,
  workSpaceRolePermission: IWorkSpaceRolePermissionRepo,
  workSpaceId: string,
): Promise<IWorkSpaceRole[]> {
  const roles: IWorkSpaceRole[] = [];
  roles.push(await createRole(workSpaceRoleRepo, workSpaceId, 'Creator'));
  roles.push(await createRole(workSpaceRoleRepo, workSpaceId, 'User'));
  roles.push(await createRole(workSpaceRoleRepo, workSpaceId, 'Visitor'));

  let i = 0;

  for (const [, permissions] of Object.entries(rolePermissions)) {
    await _updatePermissionOnRole(workSpaceRolePermission, roles[i].id, permissions);
    i++;
  }

  return roles;
}
