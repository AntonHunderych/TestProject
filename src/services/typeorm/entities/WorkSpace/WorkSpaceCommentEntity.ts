import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { BasicCommentEntity } from '../BasicCommentEntity';

@Entity({ name: 'workSpaceComment' })
export class WorkSpaceCommentEntity extends BasicCommentEntity {
  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.comments)
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
  creator: WorkSpaceUserEntity;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.comments)
  todo: WorkSpaceTodoEntity;
}
