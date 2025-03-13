import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpace } from './WorkSpaceEntity';
import { WorkSpaceUser } from './WorkSpaceUser';
import { WorkSpacePermissions } from './WorkSpacePermissions';

@Entity()
@Unique(['workSpaceId', 'name'])
export class WorkSpaceRoles {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpace, (workSpace) => workSpace.workSpaceRoles)
  workSpace: WorkSpace;

  @ManyToMany(() => WorkSpaceUser, (workSpace) => workSpace.roles)
  @JoinTable()
  workSpaceUsers: WorkSpaceUser[];

  @ManyToMany(() => WorkSpacePermissions, (workSpacePermissions) => workSpacePermissions.roles)
  @JoinTable()
  permissions: WorkSpacePermissions[];
}