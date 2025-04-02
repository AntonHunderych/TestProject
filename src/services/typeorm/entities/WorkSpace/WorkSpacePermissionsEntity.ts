import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { WorkSpaceRolePermissionEntity } from './WorkSpaceRolePermissionEntity';

@Entity({ name: 'workSpacePermissions' })
export class WorkSpacePermissionsEntity {
  @PrimaryColumn({ unique: true })
  value: string;

  @OneToMany(() => WorkSpaceRolePermissionEntity, (workSpaceRolePermission) => workSpaceRolePermission.role)
  roles: WorkSpaceRolePermissionEntity[];
}
