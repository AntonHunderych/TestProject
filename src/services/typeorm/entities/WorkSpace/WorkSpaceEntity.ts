import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceRolesEntity } from './WorkSpaceRolesEntity';
import { WorkSpaceTagEntity } from './WorkSpaceTagEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';

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
  workSpaceTodos: WorkSpaceTodoEntity[];

  @OneToMany(() => WorkSpaceUserEntity, (wsUser) => wsUser.workSpace, { cascade: ['remove'] })
  workSpaceUsers: WorkSpaceUserEntity[];

  @OneToMany(() => WorkSpaceRolesEntity, (workSpaceRoles) => workSpaceRoles.workSpace, { cascade: ['remove'] })
  workSpaceRoles: WorkSpaceRolesEntity[];

  @OneToMany(() => WorkSpaceTagEntity, (workSpaceTag) => workSpaceTag.workSpace)
  tags: WorkSpaceTagEntity[];

  @OneToMany(() => WorkSpaceCommandEntity, (workSpaceCommand) => workSpaceCommand.workSpace)
  commands: WorkSpaceCommandEntity[];
}
