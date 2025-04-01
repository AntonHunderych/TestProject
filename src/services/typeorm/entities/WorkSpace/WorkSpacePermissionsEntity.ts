import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSpaceRolePermissionEntity } from './WorkSpaceRolePermissionEntity';

@Entity({ name: 'workSpacePermissions' })
export class WorkSpacePermissionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @OneToMany(() => WorkSpaceRolePermissionEntity, (workSpaceRolePermission) => workSpaceRolePermission.role)
  roles: WorkSpaceRolePermissionEntity[];
}
