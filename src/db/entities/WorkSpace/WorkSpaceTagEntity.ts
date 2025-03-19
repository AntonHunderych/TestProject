import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, Unique } from 'typeorm';
import { BasicTag } from '../TagEntity';
import { WorkSpaceTodo } from './WorkSpaceTodoEntity';
import { WorkSpaceUser } from './WorkSpaceUserEntity';
import { WorkSpace } from './WorkSpaceEntity';

@Entity()
export class WorkSpaceTag extends BasicTag {

  @OneToMany(() => WorkSpaceTagTodo, (workSpaceTagTodo) => workSpaceTagTodo.workSpaceTodo)
  @JoinColumn({ 'name': 'todoId' })
  todos: WorkSpaceTodo[];

  @Column()
  creatorId: string;

  @ManyToOne(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.createdTags)
  @JoinColumn([{ 'name': 'creatorId',referencedColumnName: "userId" }, {name: 'workSpaceId', referencedColumnName: "workSpaceId"}])
  creator: WorkSpaceUser;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpace, (workSpace) => workSpace.tags)
  @JoinColumn({ 'name': 'workSpaceId' })
  workSpace: WorkSpace;

}

@Entity()
@Unique(['todoId', 'tagId'])
export class WorkSpaceTagTodo {

  @PrimaryColumn()
  todoId: string;

  @PrimaryColumn()
  tagId: string;

  @ManyToOne(() => WorkSpaceTag, (workSpaceTag) => workSpaceTag.todos)
  @JoinColumn({ name: 'tagId' })
  workSpaceTag: WorkSpaceTag;

  @ManyToOne(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.tags)
  @JoinColumn({ name: 'todoId' })
  workSpaceTodo: WorkSpaceTodo;

  @ManyToOne(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.assignedTags)
  assignedBy: WorkSpaceUser;

}