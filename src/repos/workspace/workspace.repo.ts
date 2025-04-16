import { DataSource, EntityManager } from 'typeorm';
import { WorkSpaceEntity } from '../../services/typeorm/entities/WorkSpace/WorkSpaceEntity';
import { DBError } from '../../types/errors/DBError';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { WorkSpace, WorkSpaceSchema } from '../../types/entities/WorkSpace/WorkSpaceSchema';

export interface IWorkSpaceRepo extends IRecreateRepo {
  createWorkSpace(workSpace: IWorkSpaceCreate): Promise<WorkSpace>;
  getWorkSpaceById(id: string): Promise<WorkSpaceEntity>;
  updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<WorkSpace>;
  deleteWorkSpace(id: string): Promise<boolean>;
  getAllWorkSpaces(): Promise<WorkSpace[]>;
}

export type IWorkSpaceCreate = Partial<WorkSpace>;
export type IWorkSpaceUpdate = Partial<Omit<WorkSpace, 'id' | 'creatorId'>>;

export function getWorkSpaceRepos(db: DataSource | EntityManager): IWorkSpaceRepo {
  const WorkSpaceRepos = db.getRepository(WorkSpaceEntity);

  return {
    async createWorkSpace(workSpace: IWorkSpaceCreate): Promise<WorkSpace> {
      try {
        const result = await WorkSpaceRepos.createQueryBuilder().insert().values(workSpace).returning('*').execute();
        return WorkSpaceSchema.parse(result.generatedMaps[0]);
      } catch (error) {
        throw new DBError('Error creating workspace', error);
      }
    },
    async deleteWorkSpace(id: string): Promise<boolean> {
      try {
        const result = await WorkSpaceRepos.createQueryBuilder()
          .delete()
          .where('id=:id', { id })
          .returning('*')
          .execute();
        return !!result.raw[0];
      } catch (error) {
        throw new DBError('Error deleting workspace', error);
      }
    },
    async getAllWorkSpaces(): Promise<WorkSpace[]> {
      try {
        return await WorkSpaceRepos.find();
      } catch (error) {
        throw new DBError('Error fetching all workspaces', error);
      }
    },
    async getWorkSpaceById(id: string): Promise<WorkSpaceEntity> {
      try {
        return await WorkSpaceRepos.createQueryBuilder('workSpace')
          .leftJoinAndSelect('workSpace.todos', 'todos')
          .leftJoinAndSelect('workSpace.users', 'users')
          .leftJoinAndSelect('workSpace.roles', 'roles')
          .leftJoinAndSelect('workSpace.tags', 'tags')
          .leftJoinAndSelect('workSpace.commands', 'commands')
          .leftJoinAndSelect('workSpace.categories', 'categories')
          .where('workSpace.id = :id', { id })
          .getOneOrFail();
      } catch (error) {
        throw new DBError(`Error fetching workspace by id ${id}`, error);
      }
    },
    async updateWorkSpace(id: string, workSpace: IWorkSpaceUpdate): Promise<WorkSpace> {
      try {
        const result = await WorkSpaceRepos.createQueryBuilder()
          .update()
          .set(workSpace)
          .where('id=:id', { id })
          .returning('*')
          .execute();
        return result.raw[0];
      } catch (error) {
        throw new DBError('Error updating workspace', error);
      }
    },
    __recreateFunction: getWorkSpaceRepos,
  };
}
