import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceRolesEntity } from './WorkSpaceRolesEntity';
import { WorkSpaceTagEntity } from './WorkSpaceTagEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';
import { WorkSpaceCategoryEntity } from './WorkSpaceCategoryEntity';
import { WorkSpaceCalendarEntity } from './WorkSpaceCalendarEntity';

@Entity({ name: 'workSpace' })
@Unique(['name', 'creatorId'])
export class WorkSpaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creatorId: string;

  @OneToMany(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.workSpace)
  todos: WorkSpaceTodoEntity[];

  @OneToMany(() => WorkSpaceUserEntity, (wsUser) => wsUser.workSpace)
  users: WorkSpaceUserEntity[];

  @OneToMany(() => WorkSpaceRolesEntity, (workSpaceRoles) => workSpaceRoles.workSpace)
  roles: WorkSpaceRolesEntity[];

  @OneToMany(() => WorkSpaceTagEntity, (workSpaceTag) => workSpaceTag.workSpace)
  tags: WorkSpaceTagEntity[];

  @OneToMany(() => WorkSpaceCommandEntity, (workSpaceCommand) => workSpaceCommand.workSpace)
  commands: WorkSpaceCommandEntity[];

  @OneToMany(() => WorkSpaceCategoryEntity, (workSpaceCategoryEntity) => workSpaceCategoryEntity.workSpace)
  categories: WorkSpaceCategoryEntity[];

  @OneToOne(() => WorkSpaceCalendarEntity, (workSpaceCalendarEntity) => workSpaceCalendarEntity.workSpace)
  calendar: WorkSpaceCalendarEntity;
}
