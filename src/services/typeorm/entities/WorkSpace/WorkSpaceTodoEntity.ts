import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceCommentEntity } from './WorkSpaceCommentEntity';
import { WorkSpaceTagTodo } from './WorkSpaceTagEntity';
import { WorkSpaceCategoryConf } from './WorkSpaceCategoryEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';
import { BasicTodoEntity } from '../BasicTodoEntity';

@Entity({ name: 'workSpaceTodo' })
export class WorkSpaceTodoEntity extends BasicTodoEntity {
  @Column({ name: 'workSpaceId' })
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (ws) => ws.workSpaceTodos)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpaceEntity;

  @ManyToOne(() => WorkSpaceUserEntity, (worksSpaceUser) => worksSpaceUser.createdTodos)
  @JoinColumn([
    { name: 'creatorId', referencedColumnName: 'userId' },
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' },
  ])
  creator: WorkSpaceUserEntity;

  @ManyToMany(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.contributedTodos)
  @JoinTable({
    name: 'workSpaceUserTodo',
  })
  contributors: WorkSpaceUserEntity[];

  @OneToMany(() => WorkSpaceCommentEntity, (workSpaceComment) => workSpaceComment.todo, { cascade: ['remove'] })
  comments: Comment[];

  @OneToMany(() => WorkSpaceTagTodo, (workSpaceTagTodo) => workSpaceTagTodo.workSpaceTodo)
  tags: WorkSpaceTagTodo[];

  @Column({ nullable: true })
  categoryId: string | null;

  @ManyToOne(() => WorkSpaceCategoryConf, (WorkSpaceCategoryConf) => WorkSpaceCategoryConf.todos)
  @JoinColumn([
    { name: 'categoryId', referencedColumnName: 'categoryId' },
    { name: 'id', referencedColumnName: 'todoId' },
  ])
  category: WorkSpaceCategoryConf;

  @ManyToOne(() => WorkSpaceCommandEntity, (workSpaceCommand) => workSpaceCommand)
  @JoinColumn([
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' },
    { name: 'commandValue', referencedColumnName: 'value' },
  ])
  command: WorkSpaceCommandEntity | null;
}
