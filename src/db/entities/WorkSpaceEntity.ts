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

  @OneToMany(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.workSpace, { cascade: ['remove'] })
  workSpaceTodos: WorkSpaceTodo[];

  @OneToMany(() => WorkSpaceUser, (wsUser) => wsUser.workSpace, { cascade: ['remove'] })
  workSpaceUsers: WorkSpaceUser[];

  @OneToMany(() => WorkSpaceRoles, (workSpaceRoles) => workSpaceRoles.workSpace, { cascade: ['remove'] })
  workSpaceRoles: WorkSpaceRoles[];
}
