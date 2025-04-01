import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { RoleEntity } from './RoleEntity';
import { UserEntity } from './UserEntity';

@Entity({ name: 'userRole' })
@Unique(['userId', 'roleId'])
export class UserRoleEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  roleId: string;

  @ManyToOne(() => RoleEntity, (role) => role.users, { onDelete: 'CASCADE' })
  role: RoleEntity;

  @ManyToOne(() => UserEntity, (user) => user.roles, { onDelete: 'CASCADE' })
  user: UserEntity;
}
