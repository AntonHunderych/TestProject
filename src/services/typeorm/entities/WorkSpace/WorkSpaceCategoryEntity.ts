import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { WorkSpaceTodo } from './WorkSpaceTodoEntity';
import { WorkSpaceUser } from './WorkSpaceUserEntity';
import { WorkSpace } from './WorkSpaceEntity';
import { BasicCategory } from '../BasicCategoryEntity';

@Entity()
export class WorkSpaceCategory extends BasicCategory {
  @OneToMany(() => WorkSpaceCategoryConf, (workSpaceCategoryTodo) => workSpaceCategoryTodo.todos)
  todos: WorkSpaceTodo[];

  @Column()
  creatorId: string;

  @ManyToOne(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.createdTags)
  @JoinColumn([
    { name: 'creatorId', referencedColumnName: 'userId' },
    {
      name: 'workSpaceId',
      referencedColumnName: 'workSpaceId',
    },
  ])
  creator: WorkSpaceUser;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpace, (workSpace) => workSpace.tags)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpace;
}

@Entity()
export class WorkSpaceCategoryConf {
  @PrimaryColumn({ unique: true })
  todoId: string;

  @ManyToOne(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.category)
  @JoinColumn({ name: 'todoId' })
  todos: WorkSpaceTodo;

  @PrimaryColumn()
  categoryId: string;

  @ManyToOne(() => WorkSpaceCategory, (workSpaceCategory) => workSpaceCategory.todos)
  @JoinColumn({ name: 'categoryId' })
  category: WorkSpaceCategory;

  @Column()
  attachedByUserId: string;

  @CreateDateColumn()
  attachedData: Date;
}
