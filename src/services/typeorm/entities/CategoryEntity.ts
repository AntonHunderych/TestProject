import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Todo } from './TodoEntity';
import { User } from './UserEntity';
import { BasicCategory } from './BasicCategoryEntity';

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
