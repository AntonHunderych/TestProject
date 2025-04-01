import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceTagEntity } from './WorkSpaceTagEntity';

@Entity({ name: 'workSpaceTagTodo' })
@Unique(['todoId', 'tagId'])
export class WorkSpaceTagTodoEntity {
  @PrimaryColumn()
  todoId: string;

  @PrimaryColumn()
  tagId: string;

  @ManyToOne(() => WorkSpaceTagEntity, (workSpaceTag) => workSpaceTag.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tagId' })
  workSpaceTag: WorkSpaceTagEntity;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.tags, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId' })
  workSpaceTodo: WorkSpaceTodoEntity;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.assignedTags)
  assignedBy: WorkSpaceUserEntity;
}
