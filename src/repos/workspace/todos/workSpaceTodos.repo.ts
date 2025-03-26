import { Brackets, DataSource, EntityManager } from 'typeorm';
import { WorkSpaceTodo } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { DBError } from '../../../types/errors/DBError';
import { IRecreateRepo } from '../../../types/IRecreatebleRepo';
import { ITodo } from '../../../types/entities/TodoSchema';

export interface IWorkSpaceTodoRepo extends IRecreateRepo {
  create(todo: Partial<WorkSpaceTodo>, workSpaceId: string, creatorId: string): Promise<WorkSpaceTodo>;

  findById(id: string): Promise<WorkSpaceTodo>;

  findAll(): Promise<WorkSpaceTodo[]>;

  findAllTodoInWorkSpace(workSpaceId: string): Promise<WorkSpaceTodo[]>;

  findAllTodoInWorkSpaceByCommand(workSpaceId: string, commandValue: string[]): Promise<WorkSpaceTodo[]>;

  update(id: string, todo: Partial<WorkSpaceTodo>): Promise<WorkSpaceTodo>;

  delete(id: string): Promise<boolean>;
}

export function getWorkSpaceTodoRepo(db: DataSource | EntityManager): IWorkSpaceTodoRepo {
  const wsTodoRepo = db.getRepository(WorkSpaceTodo);

  return {
    async create(todo: Partial<WorkSpaceTodo>, workSpaceId: string, creatorId: string): Promise<WorkSpaceTodo> {
      try {
        return await wsTodoRepo.save({
          workSpaceId,
          creatorId,
          ...todo,
        });
      } catch (error) {
        throw new DBError('Error creating workspace todo', error);
      }
    },

    async findById(id: string): Promise<WorkSpaceTodo> {
      try {
        return await wsTodoRepo.findOneOrFail({ where: { id }, relations: { creator: true } });
      } catch (error) {
        throw new DBError('Error fetching workspace todo by id', error);
      }
    },

    async findAllTodoInWorkSpace(workSpaceId: string): Promise<WorkSpaceTodo[]> {
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

    async findAllTodoInWorkSpaceByCommand(workSpaceId: string, commandValue: string[]): Promise<WorkSpaceTodo[]> {
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

    async findAll(): Promise<WorkSpaceTodo[]> {
      try {
        return await wsTodoRepo.find();
      } catch (error) {
        throw new DBError('Error fetching all workspace createdTodos', error);
      }
    },

    async update(id: string, todo: Partial<Omit<ITodo, 'id'>>): Promise<WorkSpaceTodo> {
      try {
        await wsTodoRepo.update(id, todo);
        return await wsTodoRepo.findOneByOrFail({ id });
      } catch (error) {
        throw new DBError('Error updating workspace todo', error);
      }
    },

    async delete(id: string): Promise<boolean> {
      try {
        return !!(await wsTodoRepo.delete(id));
      } catch (error) {
        throw new DBError('Error deleting workspace todo', error);
      }
    },
    __recreateFunction: getWorkSpaceTodoRepo,
  };
}
