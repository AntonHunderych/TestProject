import {
  Column, CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkSpaceTodo } from './WorkSpaceTodoEntity';
import { WorkSpaceUser } from './WorkSpaceUserEntity';
import { WorkSpace } from './WorkSpaceEntity';
import { BasicCategory } from '../CategoryEntity';

@Entity()
export class WorkSpaceCategory extends BasicCategory {

  @OneToMany(() => WorkSpaceCategoryConf, (workSpaceCategoryTodo) => workSpaceCategoryTodo.todos)
  todos: WorkSpaceTodo[];

  @Column()
  creatorId: string;

  @ManyToOne(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.createdTags)
  @JoinColumn([{ 'name': 'creatorId', referencedColumnName: 'userId' }, {
    name: 'workSpaceId',
    referencedColumnName: 'workSpaceId'
  }])
  creator: WorkSpaceUser;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpace, (workSpace) => workSpace.tags)
  @JoinColumn({ 'name': 'workSpaceId' })
  workSpace: WorkSpace;
}

@Entity()
export class WorkSpaceCategoryConf {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(/*{unique: true}*/)
  todoId: string;

  @ManyToOne(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.category)
  @JoinColumn({ 'name': 'todoId' })
  todos: WorkSpaceTodo;

  @Column()
  categoryId: string;

  @ManyToOne(() => WorkSpaceCategory, (workSpaceCategory) => workSpaceCategory.todos)
  @JoinColumn({ 'name': 'categoryId' })
  category: WorkSpaceCategory;

  @Column()
  attachedByUserId: string;

  @CreateDateColumn()
  attachedData: Date;
}