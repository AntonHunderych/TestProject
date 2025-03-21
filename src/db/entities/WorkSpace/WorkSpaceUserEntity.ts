import { Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { User } from '../UserEntity';
import { WorkSpace } from './WorkSpaceEntity';
import { WorkSpaceTodo } from './WorkSpaceTodoEntity';
import { WorkSpaceRoles } from './WorkSpaceRolesEntity';
import { WorkSpaceComment } from './WorkSpaceCommentEntity';
import { WorkSpaceTag, WorkSpaceTagTodo } from './WorkSpaceTagEntity';
import { WorkSpaceCommand } from './WorkSpaceCommandEntity';

@Entity()
@Unique(['userId', 'workSpaceId'])
export class WorkSpaceUser {
  @PrimaryColumn('uuid')
  userId: string;

  @PrimaryColumn('uuid')
  workSpaceId: string;

  @ManyToOne(() => User, (user) => user.wsUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => WorkSpace, (workspace) => workspace.workSpaceUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpace;

  @OneToMany(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.creator, { cascade: ['remove'] })
  createdTodos: WorkSpaceTodo[];

  @ManyToMany(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.contributors, { cascade: ['remove'] })
  contributedTodos: WorkSpaceTodo[];

  @OneToMany(() => WorkSpaceComment, (comment) => comment.creator, { cascade: ['remove'] })
  comments: WorkSpaceComment[];

  @ManyToMany(() => WorkSpaceRoles, (workSpace) => workSpace.workSpaceUsers, { cascade: ['remove'] })
  roles: WorkSpaceRoles[];

  @OneToMany(() => WorkSpaceTagTodo, (workSpaceTagTodo) => workSpaceTagTodo.assignedBy)
  assignedTags: WorkSpaceTagTodo[];

  @OneToMany(() => WorkSpaceTag, (workSpaceTag) => workSpaceTag.creator)
  createdTags: WorkSpaceTag[];

  @ManyToMany(() => WorkSpaceCommand, (workSpaceCommand) => workSpaceCommand.users)
  commands: WorkSpaceCommand[];

}
