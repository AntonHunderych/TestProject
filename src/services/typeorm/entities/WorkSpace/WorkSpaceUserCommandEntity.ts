import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceCommandEntity } from './WorkSpaceCommandEntity';

@Entity({ name: 'workSpaceUserCommand' })
export class WorkSpaceUserCommandEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  commandId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUserEntity) => workSpaceUserEntity.commands, { onDelete: 'CASCADE' })
  user: WorkSpaceUserEntity;

  @ManyToOne(() => WorkSpaceCommandEntity, (workSpaceCommandEntity) => workSpaceCommandEntity.users, {
    onDelete: 'CASCADE',
  })
  command: WorkSpaceCommandEntity;
}
