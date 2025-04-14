import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';

@Entity('workSpaceGoogleCalendarToken')
export class WorkSpaceGoogleCalendarTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  userId: string;

  @Column()
  workSpaceId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUserEntity) => workSpaceUserEntity.googleCalendarToken, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: WorkSpaceUserEntity;

  @ManyToOne(() => WorkSpaceEntity, (workSpaceEntity) => workSpaceEntity.tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workSpaceId', referencedColumnName: 'id' })
  workSpace: WorkSpaceEntity;
}
