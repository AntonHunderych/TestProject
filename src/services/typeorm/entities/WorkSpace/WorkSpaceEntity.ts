import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceUser } from './WorkSpaceUserEntity';
import { WorkSpaceTodo } from './WorkSpaceTodoEntity';
import { WorkSpaceRoles } from './WorkSpaceRolesEntity';
import { WorkSpaceTag } from './WorkSpaceTagEntity';
import { WorkSpaceCommand } from './WorkSpaceCommandEntity';

@Entity({ name: 'workSpace' })
@Unique(['name', 'creatorId'])
export class WorkSpace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  creatorId: string;

  @OneToMany(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.workSpace, { cascade: ['remove'] })
  workSpaceTodos: WorkSpaceTodo[];

  @OneToMany(() => WorkSpaceUser, (wsUser) => wsUser.workSpace, { cascade: ['remove'] })
  workSpaceUsers: WorkSpaceUser[];

  @OneToMany(() => WorkSpaceRoles, (workSpaceRoles) => workSpaceRoles.workSpace, { cascade: ['remove'] })
  workSpaceRoles: WorkSpaceRoles[];

  @OneToMany(() => WorkSpaceTag, (workSpaceTag) => workSpaceTag.workSpace)
  tags: WorkSpaceTag[];

  @OneToMany(() => WorkSpaceCommand, (workSpaceCommand) => workSpaceCommand.workSpace)
  commands: WorkSpaceCommand[];
}
