import { Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { UserEntity } from '../UserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceRolesEntity } from './WorkSpaceRolesEntity';
import { WorkSpaceCommentEntity } from './WorkSpaceCommentEntity';
import { WorkSpaceTagEntity, WorkSpaceTagTodo } from './WorkSpaceTagEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';

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

  @ManyToOne(() => WorkSpaceEntity, (workspace) => workspace.workSpaceUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpaceEntity;

  @OneToMany(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.creator, { cascade: ['remove'] })
  createdTodos: WorkSpaceTodoEntity[];

  @ManyToMany(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.contributors, { cascade: ['remove'] })
  contributedTodos: WorkSpaceTodoEntity[];

  @OneToMany(() => WorkSpaceCommentEntity, (comment) => comment.creator, { cascade: ['remove'] })
  comments: WorkSpaceCommentEntity[];

  @ManyToMany(() => WorkSpaceRolesEntity, (workSpace) => workSpace.workSpaceUsers, { cascade: ['remove'] })
  roles: WorkSpaceRolesEntity[];

  @OneToMany(() => WorkSpaceTagTodo, (workSpaceTagTodo) => workSpaceTagTodo.assignedBy)
  assignedTags: WorkSpaceTagTodo[];

  @OneToMany(() => WorkSpaceTagEntity, (workSpaceTag) => workSpaceTag.creator)
  createdTags: WorkSpaceTagEntity[];

  @ManyToMany(() => WorkSpaceCommandEntity, (workSpaceCommand) => workSpaceCommand.users)
  commands: WorkSpaceCommandEntity[];
}
