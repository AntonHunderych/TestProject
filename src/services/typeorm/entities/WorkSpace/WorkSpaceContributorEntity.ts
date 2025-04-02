import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';

@Entity({ name: 'workSpaceContributor' })
export class WorkSpaceContributorEntity {
  @PrimaryColumn()
  todoId: string;

  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUserEntity) => workSpaceUserEntity.roles, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: 'userId', referencedColumnName: 'userId' },
    { name: 'workSpaceId', referencedColumnName: 'workSpaceId' },
  ])
  user: WorkSpaceUserEntity;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodoEntity) => workSpaceTodoEntity.contributors, {
    onDelete: 'CASCADE',
  })
  todo: WorkSpaceTodoEntity;
}
