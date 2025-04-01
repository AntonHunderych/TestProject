import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity({ name: 'token' })
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @Column({ unique: true })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.token, { onDelete: 'CASCADE' })
  user: UserEntity;
}
