import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { BasicTagEntity } from '../BasicTagEntity';

@Entity({ name: 'workSpaceTag' })
export class WorkSpaceTagEntity extends BasicTagEntity {
  @OneToMany(() => WorkSpaceTagTodo, (workSpaceTagTodo) => workSpaceTagTodo.workSpaceTodo)
  @JoinColumn({ name: 'todoId' })
  todos: WorkSpaceTodoEntity[];

  @Column()
  creatorId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.createdTags)
  @JoinColumn([
    { name: 'creatorId', referencedColumnName: 'userId' },
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' },
  ])
  creator: WorkSpaceUserEntity;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.tags)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpaceEntity;
}

@Entity({ name: 'workSpaceTagTodo' })
@Unique(['todoId', 'tagId'])
export class WorkSpaceTagTodo {
  @PrimaryColumn()
  todoId: string;

  @PrimaryColumn()
  tagId: string;

  @ManyToOne(() => WorkSpaceTagEntity, (workSpaceTag) => workSpaceTag.todos)
  @JoinColumn({ name: 'tagId' })
  workSpaceTag: WorkSpaceTagEntity;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.tags)
  @JoinColumn({ name: 'todoId' })
  workSpaceTodo: WorkSpaceTodoEntity;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.assignedTags)
  assignedBy: WorkSpaceUserEntity;
}
