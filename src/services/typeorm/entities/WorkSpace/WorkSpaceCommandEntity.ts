import { Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceUserCommandEntity } from './WorkSpaceUserCommandEntity';

@Entity({ name: 'workSpaceCommand' })
export class WorkSpaceCommandEntity {
  @PrimaryColumn()
  workSpaceId: string;

  @PrimaryColumn()
  value: string;

  @OneToMany(() => WorkSpaceUserCommandEntity, (workSpaceUserCommandEntity) => workSpaceUserCommandEntity.command)
  users: WorkSpaceUserCommandEntity[];

  @OneToMany(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.command)
  todos: WorkSpaceTodoEntity[];

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.commands)
  workSpace: WorkSpaceEntity;
}
