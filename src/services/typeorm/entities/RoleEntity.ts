import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEntity } from './UserRoleEntity';

@Entity({ name: 'role' })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  users: UserRoleEntity[];
}
