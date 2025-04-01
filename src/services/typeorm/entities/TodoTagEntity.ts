import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { TagEntity } from './TagEntity';
import { TodoEntity } from './TodoEntity';

@Entity({ name: 'todoTag' })
@Unique(['tagId', 'todoId'])
export class TodoTagEntity {
  @PrimaryColumn()
  tagId: string;

  @PrimaryColumn()
  todoId: string;

  @ManyToOne(() => TagEntity, (tag) => tag.todos, { onDelete: 'CASCADE' })
  tag: TagEntity;

  @ManyToOne(() => TodoEntity, (todo) => todo.tags, { onDelete: 'CASCADE' })
  todo: TodoEntity;
}
