import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceUser } from './WorkSpaceUser';
import { WorkSpaceTodo } from './WorkSpaceTodo';
import { WorkSpaceRoles } from './WorkSpaceRoles';

@Entity()
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

  @OneToMany(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.workSpace)
  workSpaceTodos: WorkSpaceTodo[];

  @OneToMany(() => WorkSpaceUser, (wsUser) => wsUser.workSpace)
  workSpaceUsers: WorkSpaceUser[];

  @OneToMany(() => WorkSpaceRoles, (workSpaceUser) => workSpaceUser.workSpace)
  workSpaceRoles: WorkSpaceRoles[];
}
