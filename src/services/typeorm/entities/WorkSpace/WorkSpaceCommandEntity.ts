import { Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';

@Entity({ name: 'workSpaceCommand' })
export class WorkSpaceCommandEntity {
  @PrimaryColumn()
  workSpaceId: string;

  @PrimaryColumn()
  value: string;

  @ManyToMany(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.commands)
  @JoinTable({
    name: 'workSpaceUserCommand',
  })
  users: WorkSpaceUserEntity[];

  @OneToMany(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.command)
  todos: WorkSpaceTodoEntity[];

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.commands)
  workSpace: WorkSpaceEntity;
}
