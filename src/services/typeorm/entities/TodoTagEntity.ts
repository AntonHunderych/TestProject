import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Tag } from './TagEntity';
import { Todo } from './TodoEntity';

@Entity({ name: 'todoTag' })
@Unique(['tagId', 'todoId'])
export class TodoTag {
  @PrimaryColumn()
  tagId: string;

  @PrimaryColumn()
  todoId: string;

  @ManyToOne(() => Tag, (tag) => tag.todos, { onDelete: 'CASCADE' })
  tag: Tag;

  @ManyToOne(() => Todo, (todo) => todo.tags, { onDelete: 'CASCADE' })
  todo: Todo;
}
