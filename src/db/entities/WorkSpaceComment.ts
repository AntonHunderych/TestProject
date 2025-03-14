import { BasicComment } from './CommentEntity';
import { Entity, ManyToOne } from 'typeorm';
import { WorkSpaceTodo } from './WorkSpaceTodo';
import { WorkSpaceUser } from './WorkSpaceUser';

@Entity()
export class WorkSpaceComment extends BasicComment {
  @ManyToOne(() => WorkSpaceUser, (workSpaceUser) => workSpaceUser.comments)
  creator: WorkSpaceUser;

  @ManyToOne(() => WorkSpaceTodo, (workSpaceTodo) => workSpaceTodo.comments)
  todo: WorkSpaceTodo
}