import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './UserEntity';
import { Todo } from './TodoEntity';
import { BasicComment } from './BasicCommentEntity';

@Entity()
export class Comment extends BasicComment {
  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne(() => Todo, (todo) => todo.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId' })
  todo: Todo;
}
