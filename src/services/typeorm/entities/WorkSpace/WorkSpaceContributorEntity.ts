import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';

@Entity({ name: 'workSpaceContributor' })
export class WorkSpaceContributorEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  todoId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUserEntity) => workSpaceUserEntity.contributedTodos, {
    onDelete: 'CASCADE',
  })
  user: WorkSpaceUserEntity;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodoEntity) => workSpaceTodoEntity.contributors, {
    onDelete: 'CASCADE',
  })
  todo: WorkSpaceTodoEntity;
}
