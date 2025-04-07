import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';

@Entity({ name: 'workSpaceContributor' })
export class WorkSpaceContributorEntity {
  @PrimaryColumn()
  todoId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUserEntity) => workSpaceUserEntity.roles, { onDelete: 'CASCADE' })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: WorkSpaceUserEntity;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodoEntity) => workSpaceTodoEntity.contributors, {
    onDelete: 'CASCADE',
  })
  todo: WorkSpaceTodoEntity;
}
