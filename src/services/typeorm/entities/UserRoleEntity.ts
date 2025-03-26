import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Role } from './RoleEntity';
import { User } from './UserEntity';

@Entity({ name: 'UserRole' })
@Unique(['userId', 'roleId'])
export class UserRole {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  roleId: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;
}
