import { Brackets, DataSource, EntityManager } from 'typeorm';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { Todo } from '../../../types/entities/TodoSchema';
import { WorkSpaceTodo } from '../../../types/entities/WorkSpace/WorkSpaceTodoSchema';

export interface IWorkSpaceTodoRepo extends IRecreateRepo {
  create(todo: Partial<WorkSpaceTodo>, workSpaceId: string, creatorId: string): Promise<WorkSpaceTodoEntity>;

  findById(id: string): Promise<WorkSpaceTodoEntity>;

  getTodoWithContributors(id: string): Promise<WorkSpaceTodoEntity>;

  findAll(): Promise<WorkSpaceTodoEntity[]>;

  findAllTodoInWorkSpace(workSpaceId: string): Promise<WorkSpaceTodoEntity[]>;

  findAllTodoInWorkSpaceByCommand(workSpaceId: string, commandValue: string[]): Promise<WorkSpaceTodoEntity[]>;

  update(id: string, todo: Partial<WorkSpaceTodo>): Promise<WorkSpaceTodoEntity>;

  delete(id: string): Promise<boolean>;

  setCategoryToTodo(todoId: string, categoryId: string, userId: string): Promise<void>;

  removeCategoryTodo(todoId: string): Promise<void>;
}

export function getWorkSpaceTodoRepo(db: DataSource | EntityManager): IWorkSpaceTodoRepo {
  const wsTodoRepo = db.getRepository(WorkSpaceTodoEntity);

  return {
    async create(todo: Partial<WorkSpaceTodo>, workSpaceId: string, creatorId: string): Promise<WorkSpaceTodoEntity> {
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

    async getTodoWithContributors(id: string): Promise<WorkSpaceTodoEntity> {
      try {
        return await wsTodoRepo.findOneOrFail({
          where: { id },
          relations: { contributors: { user: { user: true, workSpace: true } } },
        });
      } catch (error) {
        throw new DBError('Error getting todo with contributors', error);
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
            category: true,
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
    async setCategoryToTodo(todoId: string, categoryId: string, userId: string): Promise<void> {
      await wsTodoRepo
        .createQueryBuilder()
        .update()
        .set({ categoryId, attachedByUserId: userId, attachedData: new Date() })
        .where('"id"=:todoId', { todoId })
        .execute();
    },
    async removeCategoryTodo(todoId: string): Promise<void> {
      await wsTodoRepo
        .createQueryBuilder()
        .update()
        .set({ categoryId: null, attachedByUserId: null, attachedData: null })
        .where('"id"=:todoId', { todoId })
        .execute();
    },
    __recreateFunction: getWorkSpaceTodoRepo,
  };
}
