import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSpaceRoles } from './WorkSpaceRolesEntity';

@Entity({ name: 'workSpacePermissions' })
export class WorkSpacePermissions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @ManyToMany(() => WorkSpaceRoles, (workSpaceRoles) => workSpaceRoles.permissions)
  @JoinTable({
    name: 'workSpaceRolePermission',
  })
  roles: WorkSpaceRoles[];
}
