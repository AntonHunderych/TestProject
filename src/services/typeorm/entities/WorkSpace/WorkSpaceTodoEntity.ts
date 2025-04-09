import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceCommentEntity } from './WorkSpaceCommentEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';
import { BasicTodoEntity } from '../BasicTodoEntity';
import { WorkSpaceTagTodoEntity } from './WorkSpaceTagTodoEntity';
import { WorkSpaceContributorEntity } from './WorkSpaceContributorEntity';
import { WorkSpaceCategoryEntity } from './WorkSpaceCategoryEntity';

@Entity({ name: 'workSpaceTodo' })
export class WorkSpaceTodoEntity extends BasicTodoEntity {
  @Column({ name: 'workSpaceId' })
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.todos, { onDelete: 'CASCADE' })
  workSpace: WorkSpaceEntity;

  @ManyToOne(() => WorkSpaceUserEntity, (worksSpaceUser) => worksSpaceUser.createdTodos, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'creatorId', referencedColumnName: 'id' }])
  creator: WorkSpaceUserEntity;

  @OneToMany(() => WorkSpaceContributorEntity, (workSpaceContributorEntity) => workSpaceContributorEntity.todo)
  contributors: WorkSpaceContributorEntity[];

  @OneToMany(() => WorkSpaceCommentEntity, (workSpaceComment) => workSpaceComment.todo, { cascade: ['remove'] })
  comments: WorkSpaceCommentEntity[];

  @OneToMany(() => WorkSpaceTagTodoEntity, (workSpaceTagTodo) => workSpaceTagTodo.workSpaceTodo)
  tags: WorkSpaceTagTodoEntity[];

  @Column({ nullable: true })
  categoryId: string | null;

  @ManyToOne(() => WorkSpaceCategoryEntity, (workSpaceCategoryEntity) => workSpaceCategoryEntity.todos, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'id' }])
  category: WorkSpaceCategoryEntity | null;

  @Column({ type: 'varchar', nullable: true })
  attachedByUserId: string | null;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUSerEntity) => workSpaceUSerEntity.attachedCategoryToTodos, {
    onDelete: 'SET NULL',
  })
  @JoinColumn([{ name: 'attachedByUserId', referencedColumnName: 'id' }])
  attachByUser: WorkSpaceUserEntity | null;

  @Column({ type: 'timestamp', nullable: true })
  attachedData: Date | null;

  @Column({ nullable: true })
  commandId: string | null;

  @ManyToOne(() => WorkSpaceCommandEntity, (workSpaceCommand) => workSpaceCommand, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'commandId' })
  command: WorkSpaceCommandEntity | null;
}
