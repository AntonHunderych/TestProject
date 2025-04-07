import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceRolesEntity } from './WorkSpaceRolesEntity';

@Entity({ name: 'workSpaceUserRole' })
export class WorkSpaceUserRoleEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  roleId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUserEntity) => workSpaceUserEntity.roles, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: WorkSpaceUserEntity;

  @ManyToOne(() => WorkSpaceRolesEntity, (workSpaceRolesEntity) => workSpaceRolesEntity.users, {
    onDelete: 'CASCADE',
  })
  role: WorkSpaceRolesEntity;
}
