import { Todo } from './TodoEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { WorkSpace } from './WorkSpaceEntity';

@Entity()
export class WorkSpaceTodo extends Todo {
  @Column({name:"workSpaceId"})
  workSpaceId: string;

  @ManyToOne(() => WorkSpace, (ws) => ws.workSpaceTodos)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpace;
}
