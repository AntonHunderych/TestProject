import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceRolesEntity } from './WorkSpaceRolesEntity';
import { WorkSpaceTagEntity } from './WorkSpaceTagEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';
import { WorkSpaceCategoryEntity } from './WorkSpaceCategoryEntity';

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

  @OneToMany(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.workSpace, { cascade: ['remove'] })
  todos: WorkSpaceTodoEntity[];

  @OneToMany(() => WorkSpaceUserEntity, (wsUser) => wsUser.workSpace, { cascade: ['remove'] })
  users: WorkSpaceUserEntity[];

  @OneToMany(() => WorkSpaceRolesEntity, (workSpaceRoles) => workSpaceRoles.workSpace, { cascade: ['remove'] })
  roles: WorkSpaceRolesEntity[];

  @OneToMany(() => WorkSpaceTagEntity, (workSpaceTag) => workSpaceTag.workSpace)
  tags: WorkSpaceTagEntity[];

  @OneToMany(() => WorkSpaceCommandEntity, (workSpaceCommand) => workSpaceCommand.workSpace)
  commands: WorkSpaceCommandEntity[];

  @OneToMany(() => WorkSpaceCategoryEntity, (workSpaceCategoryEntity) => workSpaceCategoryEntity.workSpace)
  categories: WorkSpaceCategoryEntity[];
}
