import { Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Tag } from './TagEntity';
import { Todo } from './TodoEntity';

@Entity({ name: 'TodoTag' })
@Unique(['tagId', 'todoId'])
export class TodoTag {
  @PrimaryColumn()
  tagId: string;

  @PrimaryColumn()
  todoId: string;

  @ManyToOne(() => Tag, (tag) => tag.todos)
  tag: Tag;

  @ManyToOne(() => Todo, (todo) => todo.tags)
  todo: Todo;
}
