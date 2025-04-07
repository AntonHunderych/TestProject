import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceUserCommandEntity } from './WorkSpaceUserCommandEntity';

@Entity({ name: 'workSpaceCommand' })
export class WorkSpaceCommandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workSpaceId: string;

  @Column()
  value: string;

  @OneToMany(() => WorkSpaceUserCommandEntity, (workSpaceUserCommandEntity) => workSpaceUserCommandEntity.command)
  users: WorkSpaceUserCommandEntity[];

  @OneToMany(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.command)
  todos: WorkSpaceTodoEntity[];

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.commands, { onDelete: 'CASCADE' })
  workSpace: WorkSpaceEntity;
}
