import { Brackets, DataSource, EntityManager } from 'typeorm';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { Todo } from '../../../types/entities/TodoSchema';
import { WorkSpaceTodo1 } from '../../../types/entities/WorkSpace/WorkSpaceTodoSchema';

export interface IWorkSpaceTodoRepo extends IRecreateRepo {
  create(todo: Partial<WorkSpaceTodo1>, workSpaceId: string, creatorId: string): Promise<WorkSpaceTodo1>;

  findById(id: string): Promise<WorkSpaceTodoEntity>;

  findAll(): Promise<WorkSpaceTodoEntity[]>;

  findAllTodoInWorkSpace(workSpaceId: string): Promise<WorkSpaceTodoEntity[]>;

  findAllTodoInWorkSpaceByCommand(workSpaceId: string, commandValue: string[]): Promise<WorkSpaceTodoEntity[]>;

  update(id: string, todo: Partial<WorkSpaceTodoEntity>): Promise<WorkSpaceTodoEntity>;

  delete(id: string): Promise<boolean>;
}

export function getWorkSpaceTodoRepo(db: DataSource | EntityManager): IWorkSpaceTodoRepo {
  const wsTodoRepo = db.getRepository(WorkSpaceTodoEntity);

  return {
    async create(todo: Partial<WorkSpaceTodo1>, workSpaceId: string, creatorId: string): Promise<WorkSpaceTodoEntity> {
      try {
        const data = { ...todo, workSpaceId, creatorId };
        const result = await wsTodoRepo.createQueryBuilder().insert().values(data).returning('*').execute();
        return result.raw[0];
      } catch (error) {
        throw new DBError('Error creating workspace todo', error);
      }
    },

    async findById(id: string): Promise<WorkSpaceTodoEntity> {
      try {
        return await wsTodoRepo.findOneOrFail({ where: { id }, relations: { creator: true } });
      } catch (error) {
        throw new DBError('Error fetching workspace todo by id', error);
      }
    },

    async findAllTodoInWorkSpace(workSpaceId: string): Promise<WorkSpaceTodoEntity[]> {
      try {
        return await wsTodoRepo.find({
          where: { workSpaceId },
          relations: {
            creator: true,
            comments: true,
            contributors: true,
            tags: { workSpaceTag: true },
            category: { category: true },
            command: true,
          },
        });
      } catch (error) {
        throw new DBError('Error fetching all createdTodos in workspace', error);
      }
    },

    async findAllTodoInWorkSpaceByCommand(workSpaceId: string, commandValue: string[]): Promise<WorkSpaceTodoEntity[]> {
      try {
        const query = wsTodoRepo
          .createQueryBuilder('wsTodo')
          .leftJoinAndSelect('wsTodo.creator', 'creator')
          .leftJoinAndSelect('wsTodo.comments', 'comments')
          .leftJoinAndSelect('wsTodo.contributors', 'contributors')
          .leftJoinAndSelect('wsTodo.tags', 'tags')
          .leftJoinAndSelect('tags.workSpaceTag', 'workSpaceTag')
          .leftJoinAndSelect('wsTodo.category', 'category')
          .leftJoinAndSelect('wsTodo.command', 'command')
          .where('wsTodo.workSpaceId = :workSpaceId', { workSpaceId });

        if (commandValue && commandValue.length > 0) {
          query.andWhere(
            new Brackets((qb) => {
              qb.where('command.value IN (:...commandValue)', { commandValue }).orWhere('command.value IS NULL');
            }),
          );
        } else {
          query.andWhere('command.value IS NULL');
        }

        return await query.getMany();
      } catch (error) {
        throw new DBError('Error fetching all createdTodos in workspace by command', error);
      }
    },

    async findAll(): Promise<WorkSpaceTodoEntity[]> {
      try {
        return await wsTodoRepo.find();
      } catch (error) {
        throw new DBError('Error fetching all workspace createdTodos', error);
      }
    },

    async update(id: string, todo: Partial<Omit<Todo, 'id'>>): Promise<WorkSpaceTodoEntity> {
      try {
        const result = await wsTodoRepo
          .createQueryBuilder()
          .update()
          .set(todo)
          .where('id = :id', { id })
          .returning('*')
          .execute();
        return result.raw[0];
      } catch (error) {
        throw new DBError('Error updating workspace todo', error);
      }
    },

    async delete(id: string): Promise<boolean> {
      try {
        const result = await wsTodoRepo.createQueryBuilder().delete().where('id=:id', { id }).returning('*').execute();
        return !!result.raw[0];
      } catch (error) {
        throw new DBError('Error deleting workspace todo', error);
      }
    },
    __recreateFunction: getWorkSpaceTodoRepo,
  };
}
