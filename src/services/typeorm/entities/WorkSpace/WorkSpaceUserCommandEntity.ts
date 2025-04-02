import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';

@Entity({ name: 'workSpaceUserCommand' })
export class WorkSpaceUserCommandEntity {
  @PrimaryColumn()
  commandId: string;

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

  @ManyToOne(() => WorkSpaceCommandEntity, (workSpaceCommandEntity) => workSpaceCommandEntity.users, {
    onDelete: 'CASCADE',
  })
  command: WorkSpaceCommandEntity;
}
