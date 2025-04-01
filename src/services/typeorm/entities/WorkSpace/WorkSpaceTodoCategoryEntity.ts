import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceCategoryEntity } from './WorkSpaceCategoryEntity';

@Entity({ name: 'workSpaceTodoCategory' })
export class WorkSpaceTodoCategoryEntity {
  @PrimaryColumn({ unique: true })
  todoId: string;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.category, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId' })
  todos: WorkSpaceTodoEntity;

  @PrimaryColumn()
  categoryId: string;

  @ManyToOne(() => WorkSpaceCategoryEntity, (workSpaceCategory) => workSpaceCategory.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'categoryId' })
  category: WorkSpaceCategoryEntity;

  @Column()
  attachedByUserId: string;

  @CreateDateColumn()
  attachedData: Date;
}
