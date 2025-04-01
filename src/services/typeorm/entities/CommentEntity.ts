import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './UserEntity';
import { TodoEntity } from './TodoEntity';
import { BasicCommentEntity } from './BasicCommentEntity';

@Entity({ name: 'comment' })
export class CommentEntity extends BasicCommentEntity {
  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: UserEntity;

  @ManyToOne(() => TodoEntity, (todo) => todo.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId' })
  todo: TodoEntity;
}
