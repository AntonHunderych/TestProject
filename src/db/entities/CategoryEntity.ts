import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './TodoEntity';
import { User } from './UserEntity';

export class BasicCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  value: string;

  @Column()
  description: string;
}

@Entity()
export class Category extends BasicCategory {
  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ name: 'userId' })
  user: User;
}
