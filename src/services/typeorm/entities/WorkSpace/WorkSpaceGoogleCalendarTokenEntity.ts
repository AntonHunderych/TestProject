import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceGoogleCalendarEventEntity } from './WorkSpaceGoogleCalendarEventEntity';

@Entity('workSpaceGoogleCalendarToken')
@Unique(['userId', 'workSpaceId'])
export class WorkSpaceGoogleCalendarTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  userId: string;

  @Column()
  workSpaceId: string;

  @Column()
  calendarId: string;

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

  @OneToMany(
    () => WorkSpaceGoogleCalendarEventEntity,
    (workSpaceGoogleCalendarEventEntity) => workSpaceGoogleCalendarEventEntity.token,
  )
  events: WorkSpaceGoogleCalendarEventEntity[];
}
