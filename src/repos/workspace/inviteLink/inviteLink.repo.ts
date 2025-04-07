import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceInviteLinkEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceInviteLinkEntity';
import { DBError } from '../../../types/errors/DBError';
import z from 'zod';

export interface IWorkSpaceInviteLink {
  createInvite(workspaceId: string, userId: string, token: string, salt: string): Promise<string>;
  findValidInvite(id: string): Promise<WorkSpaceInviteLinkEntity>;
  deleteInvite(id: string): Promise<void>;
}

export function getWorkSpaceInviteLinkRepo(db: DataSource | EntityManager): IWorkSpaceInviteLink {
  const workSpaceInviteLinkRepo = db.getRepository(WorkSpaceInviteLinkEntity);

  return {
    async createInvite(workspaceId: string, userId: string, token: string, salt: string): Promise<string> {
      try {
        const result = await workSpaceInviteLinkRepo
          .createQueryBuilder()
          .insert()
          .values({
            workspaceId,
            userId,
            token,
            salt,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
          })
          .orUpdate(['token', 'salt', 'createdAt', 'expiresAt'], ['userId', 'workspaceId'])
          .returning('id')
          .execute();
        return z.string().parse(result.raw[0].id);
      } catch (e) {
        throw new DBError(`Error while creating invite: ${e}`);
      }
    },

    async findValidInvite(id: string): Promise<WorkSpaceInviteLinkEntity> {
      try {
        return await workSpaceInviteLinkRepo
          .createQueryBuilder('invite')
          .where('invite.id = :id', { id })
          .andWhere('invite.expiresAt > now()')
          .getOneOrFail();
      } catch (e) {
        throw new DBError('Error while finding valid invite');
      }
    },

    async deleteInvite(id: string): Promise<void> {
      try {
        await workSpaceInviteLinkRepo.createQueryBuilder().delete().where('id = :id', { id }).execute();
      } catch (e) {
        throw new DBError(`Error while deleting invite: ${id}`);
      }
    },
  };
}
