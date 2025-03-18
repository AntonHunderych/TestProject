import { Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { User } from './UserEntity';
import { WorkSpace } from './WorkSpaceEntity';
import { WorkSpaceTodo } from './WorkSpaceTodo';
import { WorkSpaceRoles } from './WorkSpaceRoles';
import { WorkSpaceComment } from './WorkSpaceComment';

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
}
