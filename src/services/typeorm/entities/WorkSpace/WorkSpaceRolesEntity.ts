import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceRolePermissionEntity } from './WorkSpaceRolePermissionEntity';
import { WorkSpaceUserRoleEntity } from './WorkSpaceUserRoleEntity';

@Entity({ name: 'workSpaceRoles' })
@Unique(['workSpaceId', 'name'])
export class WorkSpaceRolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceEntity, (workSpace) => workSpace.roles, { onDelete: 'CASCADE' })
  workSpace: WorkSpaceEntity;

  @OneToMany(() => WorkSpaceUserRoleEntity, (workSpaceUserRoleEntity) => workSpaceUserRoleEntity.user)
  users: WorkSpaceUserRoleEntity[];

  @OneToMany(() => WorkSpaceRolePermissionEntity, (workSpaceRolePermissionEntity) => workSpaceRolePermissionEntity.role)
  permissions: WorkSpaceRolePermissionEntity[];
}
