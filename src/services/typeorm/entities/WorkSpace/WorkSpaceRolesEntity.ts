import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpacePermissionsEntity } from './WorkSpacePermissionsEntity';

@Entity({ name: 'workSpaceRoles' })
@Unique(['workSpaceId', 'name'])
export class WorkSpaceRolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.workSpaceRoles)
  workSpace: WorkSpaceEntity;

  @ManyToMany(() => WorkSpaceUserEntity, (workSpace) => workSpace.roles)
  @JoinTable({
    name: 'workSpaceUserRole',
  })
  workSpaceUsers: WorkSpaceUserEntity[];

  @ManyToMany(() => WorkSpacePermissionsEntity, (workSpacePermissions) => workSpacePermissions.roles)
  permissions: WorkSpacePermissionsEntity[];
}
