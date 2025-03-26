import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './UserRoleEntity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @Column({
    nullable: true,
  })
  description: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  users: UserRole[];
}
