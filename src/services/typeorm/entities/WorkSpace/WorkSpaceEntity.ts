import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceRolesEntity } from './WorkSpaceRolesEntity';
import { WorkSpaceTagEntity } from './WorkSpaceTagEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';
import { WorkSpaceCategoryEntity } from './WorkSpaceCategoryEntity';
import { WorkSpaceGoogleCalendarTokenEntity } from './WorkSpaceGoogleCalendarTokenEntity';
import { WorkSpaceFileEntity } from './WorkSpaceFileEntity';

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

  @OneToMany(
    () => WorkSpaceGoogleCalendarTokenEntity,
    (workSpaceGoogleCalendarToken) => workSpaceGoogleCalendarToken.workSpace,
  )
  tokens: WorkSpaceGoogleCalendarTokenEntity[];

  @OneToMany(() => WorkSpaceFileEntity, (workSpaceUser) => workSpaceUser.workSpace)
  files: WorkSpaceFileEntity[];
}
