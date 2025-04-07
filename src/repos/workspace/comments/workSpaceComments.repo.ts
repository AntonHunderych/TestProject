import { DataSource, EntityManager, Repository } from 'typeorm';
import { WorkSpaceCommentEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceCommentEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { WorkSpaceComment, WorkSpaceCommentSchema } from '../../../types/entities/WorkSpace/WorkSpaceCommentSchema';

export interface IWorkSpaceCommentRepo extends IRecreateRepo {
  createComment(commentData: Partial<WorkSpaceComment>): Promise<WorkSpaceComment>;
  getCommentById(id: string): Promise<WorkSpaceCommentEntity>;
  updateComment(id: string, updateData: Partial<WorkSpaceComment>): Promise<WorkSpaceComment>;
  deleteComment(id: string): Promise<void>;
  getCommentsByTodoId(todoId: string): Promise<WorkSpaceCommentEntity[]>;
}

export function getWorkSpaceCommentRepos(db: DataSource | EntityManager): IWorkSpaceCommentRepo {
  const commentRepo: Repository<WorkSpaceCommentEntity> = db.getRepository(WorkSpaceCommentEntity);

  return {
    async createComment(commentData: Partial<WorkSpaceComment>): Promise<WorkSpaceComment> {
      try {
        const result = await commentRepo.createQueryBuilder().insert().values(commentData).returning('*').execute();
        return WorkSpaceCommentSchema.parse(result.generatedMaps[0]);
      } catch (error) {
        throw new DBError('Error creating comment', error);
      }
    },

    async getCommentById(id: string): Promise<WorkSpaceCommentEntity> {
      try {
        return await commentRepo.findOneOrFail({ where: { id } });
      } catch (error) {
        throw new DBError('Error fetching comment by id', error);
      }
    },

    async updateComment(id: string, updateData: Partial<WorkSpaceComment>): Promise<WorkSpaceComment> {
      try {
        const result = await commentRepo
          .createQueryBuilder()
          .update()
          .set(updateData)
          .where('id=:id', { id })
          .returning('*')
          .execute();
        return WorkSpaceCommentSchema.parse(result.raw[0]);
      } catch (error) {
        throw new DBError('Error updating comment', error);
      }
    },

    async deleteComment(id: string): Promise<void> {
      try {
        await commentRepo.createQueryBuilder().delete().where('id=:id', { id }).execute();
      } catch (error) {
        throw new DBError('Error deleting comment', error);
      }
    },

    async getCommentsByTodoId(todoId: string): Promise<WorkSpaceCommentEntity[]> {
      try {
        return await commentRepo.find({ where: { todo: { id: todoId } } });
      } catch (error) {
        throw new DBError('Error fetching comments by todo id', error);
      }
    },
    __recreateFunction: getWorkSpaceCommentRepos,
  };
}
