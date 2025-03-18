import { BasicTodo } from './TodoEntity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { WorkSpace } from './WorkSpaceEntity';
import { WorkSpaceUser } from './WorkSpaceUser';
import { WorkSpaceComment } from './WorkSpaceComment';

@Entity()
export class WorkSpaceTodo extends BasicTodo {
  @Column({ name: 'workSpaceId' })
  workSpaceId: string;

  @ManyToOne(() => WorkSpace, (ws) => ws.workSpaceTodos)
  @JoinColumn({ name: 'workSpaceId' })
  workSpace: WorkSpace;

  @ManyToOne(() => WorkSpaceUser, (worksSpaceUser) => worksSpaceUser.createdTodos)
  @JoinColumn([
    { name: 'creatorId', referencedColumnName: 'userId' },
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' },
  ])
  creator: WorkSpaceUser;

  @ManyToMany(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.contributedTodos)
  @JoinTable()
  contributors: WorkSpaceUser[];

  @OneToMany(() => WorkSpaceComment, (workSpaceComment) => workSpaceComment.todo)
  comments: Comment[];
}
