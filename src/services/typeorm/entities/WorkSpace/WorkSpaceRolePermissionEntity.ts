import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkSpaceRolesEntity } from './WorkSpaceRolesEntity';
import { WorkSpacePermissionsEntity } from './WorkSpacePermissionsEntity';

@Entity({ name: 'workSpaceRolePermission' })
export class WorkSpaceRolePermissionEntity {
  @PrimaryColumn()
  roleId: string;

  @PrimaryColumn()
  value: string;

  @ManyToOne(() => WorkSpaceRolesEntity, (workSpaceRolesEntity) => workSpaceRolesEntity.permissions, {
    onDelete: 'CASCADE',
  })
  role: WorkSpaceRolesEntity;

  @ManyToOne(() => WorkSpacePermissionsEntity, (workSpacePermissionsEntity) => workSpacePermissionsEntity.roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'value',
    referencedColumnName: 'value',
  })
  permission: WorkSpacePermissionsEntity;
}
