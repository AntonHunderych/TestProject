import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { User } from './UserEntity';
import { WorkSpace } from './WorkSpaceEntity';
import { WorkSpaceTodo } from './WorkSpaceTodo';

@Entity()
@Unique(['userId', 'workSpaceId'])
export class WorkSpaceUser {

  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  workSpaceId: string;

  @ManyToOne(() => User, (user) => user.wsUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => WorkSpace, (workspace) => workspace.wsUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpace;

  @Column()
  workSpaceUserId: number;

  @OneToMany(()=> WorkSpaceTodo, (todo) => todo.creator )
  todos: WorkSpaceTodo[]
}