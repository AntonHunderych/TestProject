import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './UserEntity';

@Entity()
export class TokenEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
    value: string;

  @Column()
  userId: string;

  @OneToOne(()=> User, user => user.token)
  user: User;

}