import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './UserEntity';
import { Comment } from './CommentEntity';
import { Category } from './CategoryEntity';
import { BasicTodo } from './BasicTodoEntity';
import { TodoTag } from './TodoTagEntity';

@Entity()
export class Todo extends BasicTodo {
  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'creatorId' })
  creator: User;

  @OneToMany(() => Comment, (comment) => comment.todo)
  comments: Comment[];

  @OneToMany(() => TodoTag, (tag) => tag.todo)
  tags: TodoTag[];

  @ManyToOne(() => Category, (category) => category.todos)
  category: Category;
}
