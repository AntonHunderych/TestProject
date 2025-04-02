import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { BasicTagEntity } from '../BasicTagEntity';
import { WorkSpaceTagTodoEntity } from './WorkSpaceTagTodoEntity';

@Entity({ name: 'workSpaceTag' })
export class WorkSpaceTagEntity extends BasicTagEntity {
  @OneToMany(() => WorkSpaceTagTodoEntity, (workSpaceTagTodo) => workSpaceTagTodo.workSpaceTodo)
  @JoinColumn({ name: 'todoId' })
  todos: WorkSpaceTagTodoEntity[];

  @Column()
  creatorId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.createdTags, { onDelete: 'CASCADE' })
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
