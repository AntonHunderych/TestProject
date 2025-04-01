import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSpaceRolesEntity } from './WorkSpaceRolesEntity';

@Entity({ name: 'workSpacePermissions' })
export class WorkSpacePermissionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @ManyToMany(() => WorkSpaceRolesEntity, (workSpaceRoles) => workSpaceRoles.permissions)
  @JoinTable({
    name: 'workSpaceRolePermission',
  })
  roles: WorkSpaceRolesEntity[];
}
