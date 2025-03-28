import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpace } from './WorkSpaceEntity';
import { WorkSpaceUser } from './WorkSpaceUserEntity';
import { WorkSpacePermissions } from './WorkSpacePermissionsEntity';

@Entity({ name: 'workSpaceRoles' })
@Unique(['workSpaceId', 'name'])
export class WorkSpaceRoles {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpace, (workSpace) => workSpace.workSpaceRoles)
  workSpace: WorkSpace;

  @ManyToMany(() => WorkSpaceUser, (workSpace) => workSpace.roles)
  @JoinTable({
    name: 'workSpaceUserRole',
  })
  workSpaceUsers: WorkSpaceUser[];

  @ManyToMany(() => WorkSpacePermissions, (workSpacePermissions) => workSpacePermissions.roles)
  permissions: WorkSpacePermissions[];
}
