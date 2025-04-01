import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { BasicCategoryEntity } from '../BasicCategoryEntity';

@Entity({ name: 'workSpaceCategory' })
export class WorkSpaceCategoryEntity extends BasicCategoryEntity {
  @OneToMany(() => WorkSpaceCategoryConf, (workSpaceCategoryTodo) => workSpaceCategoryTodo.todos)
  todos: WorkSpaceTodoEntity[];

  @Column()
  creatorId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.createdTags)
  @JoinColumn([
    { name: 'creatorId', referencedColumnName: 'userId' },
    {
      name: 'workSpaceId',
      referencedColumnName: 'workSpaceId',
    },
  ])
  creator: WorkSpaceUserEntity;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.tags)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpaceEntity;
}

@Entity({ name: 'workSpaceTodoCategory' })
export class WorkSpaceCategoryConf {
  @PrimaryColumn({ unique: true })
  todoId: string;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.category)
  @JoinColumn({ name: 'todoId' })
  todos: WorkSpaceTodoEntity;

  @PrimaryColumn()
  categoryId: string;

  @ManyToOne(() => WorkSpaceCategoryEntity, (workSpaceCategory) => workSpaceCategory.todos)
  @JoinColumn({ name: 'categoryId' })
  category: WorkSpaceCategoryEntity;

  @Column()
  attachedByUserId: string;

  @CreateDateColumn()
  attachedData: Date;
}
