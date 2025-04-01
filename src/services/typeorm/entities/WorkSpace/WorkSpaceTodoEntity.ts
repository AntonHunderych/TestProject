import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceCommentEntity } from './WorkSpaceCommentEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';
import { BasicTodoEntity } from '../BasicTodoEntity';
import { WorkSpaceTagTodoEntity } from './WorkSpaceTagTodoEntity';
import { WorkSpaceTodoCategoryEntity } from './WorkSpaceTodoCategoryEntity';
import { WorkSpaceContributorEntity } from './WorkSpaceContributorEntity';

@Entity({ name: 'workSpaceTodo' })
export class WorkSpaceTodoEntity extends BasicTodoEntity {
  @Column({ name: 'workSpaceId' })
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (ws) => ws.todos)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpaceEntity;

  @ManyToOne(() => WorkSpaceUserEntity, (worksSpaceUser) => worksSpaceUser.createdTodos)
  @JoinColumn([
    { name: 'creatorId', referencedColumnName: 'userId' },
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' },
  ])
  creator: WorkSpaceUserEntity;

  @OneToMany(() => WorkSpaceContributorEntity, (workSpaceContributorEntity) => workSpaceContributorEntity.todo)
  contributors: WorkSpaceContributorEntity[];

  @OneToMany(() => WorkSpaceCommentEntity, (workSpaceComment) => workSpaceComment.todo, { cascade: ['remove'] })
  comments: WorkSpaceCommentEntity[];

  @OneToMany(() => WorkSpaceTagTodoEntity, (workSpaceTagTodo) => workSpaceTagTodo.workSpaceTodo)
  tags: WorkSpaceTagTodoEntity[];

  @Column({ nullable: true })
  categoryId: string | null;

  @ManyToOne(() => WorkSpaceTodoCategoryEntity, (WorkSpaceCategoryConf) => WorkSpaceCategoryConf.todos)
  @JoinColumn([
    { name: 'categoryId', referencedColumnName: 'categoryId' },
    { name: 'id', referencedColumnName: 'todoId' },
  ])
  category: WorkSpaceTodoCategoryEntity;

  @ManyToOne(() => WorkSpaceCommandEntity, (workSpaceCommand) => workSpaceCommand)
  @JoinColumn([
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' },
    { name: 'commandValue', referencedColumnName: 'value' },
  ])
  command: WorkSpaceCommandEntity | null;
}
