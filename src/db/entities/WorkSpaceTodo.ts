import { Todo } from './TodoEntity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { WorkSpace } from './WorkSpaceEntity';

@Entity()
export class WorkSpaceTodo extends Todo {
  @Column()
  workSpaceId: string;

  @OneToMany(() => WorkSpace, (ws) => ws.wsTodos)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpace;
}
