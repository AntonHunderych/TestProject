import { BasicComment } from '../CommentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { WorkSpaceTodo } from './WorkSpaceTodoEntity';
import { WorkSpaceUser } from './WorkSpaceUserEntity';

@Entity()
export class WorkSpaceComment extends BasicComment {
  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.comments)
  @JoinColumn([
    {
      name: 'workSpaceId',
      referencedColumnName: 'workSpaceId',
    },
    {
      name: 'authorId',
      referencedColumnName: 'userId',
    },
  ])
  creator: WorkSpaceUser;

  @ManyToOne(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.comments)
  todo: WorkSpaceTodo;
}
