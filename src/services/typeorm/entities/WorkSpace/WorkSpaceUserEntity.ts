import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { UserEntity } from '../UserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceCommentEntity } from './WorkSpaceCommentEntity';
import { WorkSpaceTagEntity } from './WorkSpaceTagEntity';
import { WorkSpaceTagTodoEntity } from './WorkSpaceTagTodoEntity';
import { WorkSpaceContributorEntity } from './WorkSpaceContributorEntity';
import { WorkSpaceUserRoleEntity } from './WorkSpaceUserRoleEntity';
import { WorkSpaceUserCommandEntity } from './WorkSpaceUserCommandEntity';

@Entity({ name: 'workSpaceUser' })
@Unique(['userId', 'workSpaceId'])
export class WorkSpaceUserEntity {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  workSpaceId: string;

  @ManyToOne(() => UserEntity, (user) => user.wsUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => WorkSpaceEntity, (workspace) => workspace.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpaceEntity;

  @OneToMany(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.creator)
  createdTodos: WorkSpaceTodoEntity[];

  @OneToMany(() => WorkSpaceContributorEntity, (workSpaceContributorEntity) => workSpaceContributorEntity.user)
  contributedTodos: WorkSpaceContributorEntity[];

  @OneToMany(() => WorkSpaceCommentEntity, (comment) => comment.creator)
  comments: WorkSpaceCommentEntity[];

  @OneToMany(() => WorkSpaceUserRoleEntity, (workSpaceUserRoleEntity) => workSpaceUserRoleEntity.user)
  roles: WorkSpaceUserRoleEntity[];

  @OneToMany(() => WorkSpaceTagTodoEntity, (workSpaceTagTodo) => workSpaceTagTodo.assignedBy)
  assignedTags: WorkSpaceTagTodoEntity[];

  @OneToMany(() => WorkSpaceTagEntity, (workSpaceTag) => workSpaceTag.creator)
  createdTags: WorkSpaceTagEntity[];

  @OneToMany(() => WorkSpaceUserCommandEntity, (workSpaceUserCommandEntity) => workSpaceUserCommandEntity.user)
  commands: WorkSpaceUserCommandEntity[];

  @OneToMany(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.attachByUser)
  attachedCategoryToTodos: WorkSpaceTodoEntity;
}
