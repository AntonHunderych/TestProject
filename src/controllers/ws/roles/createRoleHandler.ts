import { Permissions } from '../../../types/Enum/PermisionsEnum';
import { WorkSpaceRoles } from '../../../db/entities/WorkSpace/WorkSpaceRolesEntity';
import { IWorkSpaceRolesRepo } from '../../../repos/workspace/roles/workSpaceRoles.repo';
import { FastifyReply } from 'fastify';

export async function createRoleHandler(
  workSpaceRoleRepo: IWorkSpaceRolesRepo,
  workSpaceId: string,
  roleName: string,
  permissions: Permissions[],
  reply: FastifyReply,
): Promise<WorkSpaceRoles> {
  try {
    await workSpaceRoleRepo.create(workSpaceId, roleName);
    return await workSpaceRoleRepo.updatePermissionOnRole(workSpaceId, roleName, permissions);
  } catch (e) {
    reply.status(400).send({ error: e });
    throw e;
  }
}
