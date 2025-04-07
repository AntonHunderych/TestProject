import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './UserEntity';
import { CommentEntity } from './CommentEntity';
import { CategoryEntity } from './CategoryEntity';
import { BasicTodoEntity } from './BasicTodoEntity';
import { TodoTagEntity } from './TodoTagEntity';

@Entity({ name: 'todo' })
export class TodoEntity extends BasicTodoEntity {
  @ManyToOne(() => UserEntity, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  creator: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.todo)
  comments: CommentEntity[];

  @OneToMany(() => TodoTagEntity, (tag) => tag.todo)
  tags: TodoTagEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.todos, { onDelete: 'SET NULL' })
  category: CategoryEntity;
}
