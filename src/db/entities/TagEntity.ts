import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './TodoEntity';
import { User } from './UserEntity';

export class BasicTag {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  value: string;

}

@Entity()
export class Tag extends BasicTag {
  @ManyToMany(() => Todo, (todo) => todo.tags)
  @JoinTable()
  todos: Todo[];

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ 'name': 'userId' })
  user: User;

}