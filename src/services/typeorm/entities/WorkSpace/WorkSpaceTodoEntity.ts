import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { WorkSpace } from './WorkSpaceEntity';
import { WorkSpaceUser } from './WorkSpaceUserEntity';
import { WorkSpaceComment } from './WorkSpaceCommentEntity';
import { WorkSpaceTagTodo } from './WorkSpaceTagEntity';
import { WorkSpaceCategoryConf } from './WorkSpaceCategoryEntity';
import { WorkSpaceCommand } from './WorkSpaceCommandEntity';
import { BasicTodo } from '../BasicTodoEntity';

@Entity({ name: 'workSpaceTodo' })
export class WorkSpaceTodo extends BasicTodo {
  @Column({ name: 'workSpaceId' })
  workSpaceId: string;

  @ManyToOne(() => WorkSpace, (ws) => ws.workSpaceTodos)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpace;

  @ManyToOne(() => WorkSpaceUser, (worksSpaceUser) => worksSpaceUser.createdTodos)
  @JoinColumn([
    { name: 'creatorId', referencedColumnName: 'userId' },
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' },
  ])
  creator: WorkSpaceUser;

  @ManyToMany(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.contributedTodos)
  @JoinTable({
    name: 'workSpaceUserTodo',
  })
  contributors: WorkSpaceUser[];

  @OneToMany(() => WorkSpaceComment, (workSpaceComment) => workSpaceComment.todo, { cascade: ['remove'] })
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

  @ManyToOne(() => WorkSpaceCommand, (workSpaceCommand) => workSpaceCommand)
  @JoinColumn([
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' },
    { name: 'commandValue', referencedColumnName: 'value' },
  ])
  command: WorkSpaceCommand | null;
}
