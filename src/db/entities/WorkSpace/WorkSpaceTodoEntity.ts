import { BasicTodo } from '../TodoEntity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { WorkSpace } from './WorkSpaceEntity';
import { WorkSpaceUser } from './WorkSpaceUserEntity';
import { WorkSpaceComment } from './WorkSpaceCommentEntity';
import { WorkSpaceTagTodo } from './WorkSpaceTagEntity';
import { WorkSpaceCategoryConf } from './WorkSpaceCategoryEntity';

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
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' }
  ])
  creator: WorkSpaceUser;

  @ManyToMany(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.contributedTodos)
  @JoinTable()
  contributors: WorkSpaceUser[];

  @OneToMany(() => WorkSpaceComment, (workSpaceComment) => workSpaceComment.todo, { cascade: ['remove'] })
  comments: Comment[];

  @OneToMany(() => WorkSpaceTagTodo, (workSpaceTagTodo) => workSpaceTagTodo.workSpaceTodo)
  tags: WorkSpaceTagTodo[];

  @ManyToOne(() => WorkSpaceCategoryConf, (workSpaceCategoryTodo) => workSpaceCategoryTodo.todos)
  category: WorkSpaceCategoryConf;
}
