import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './UserEntity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column({ unique: true })
  userId: string;

  @OneToOne(() => User, (user) => user.token, { onDelete: 'CASCADE' })
  user: User;
}
