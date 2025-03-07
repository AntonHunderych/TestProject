import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './UserEntity';

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

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
