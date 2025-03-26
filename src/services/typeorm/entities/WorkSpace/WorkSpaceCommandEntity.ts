import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { WorkSpaceUser } from './WorkSpaceUserEntity';
import { WorkSpaceTodo } from './WorkSpaceTodoEntity';
import { WorkSpace } from './WorkSpaceEntity';

@Entity()
export class WorkSpaceCommand {
  @PrimaryColumn()
  workSpaceId: string;

  @PrimaryColumn()
  value: string;

  @ManyToMany(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.commands)
  @JoinTable()
  users: WorkSpaceUser[];

  @OneToMany(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.command)
  todos: WorkSpaceTodo[];

  @ManyToOne(() => WorkSpace, (workSpace) => workSpace.commands)
  workSpace: WorkSpace;
}
