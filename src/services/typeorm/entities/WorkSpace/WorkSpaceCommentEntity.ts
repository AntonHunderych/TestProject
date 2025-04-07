import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { BasicCommentEntity } from '../BasicCommentEntity';

@Entity({ name: 'workSpaceComment' })
export class WorkSpaceCommentEntity extends BasicCommentEntity {
  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.comments, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'authorId', referencedColumnName: 'id' }])
  creator: WorkSpaceUserEntity;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.comments, { onDelete: 'CASCADE' })
  todo: WorkSpaceTodoEntity;
}
