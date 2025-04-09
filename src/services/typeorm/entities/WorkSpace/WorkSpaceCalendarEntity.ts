import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSpaceEntity } from './WorkSpaceEntity';
import { WorkSpaceGoogleCalendarEventEntity } from './WorkSpaceGoogleCalendarEventEntity';
import { WorkSpaceGoogleCalendarTokenEntity } from './WorkSpaceGoogleCalendarTokenEntity';

@Entity({ name: 'workSpaceCalendar' })
export class WorkSpaceCalendarEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  workSpaceId: string;

  @OneToOne(() => WorkSpaceEntity, (workSpace) => workSpace.calendar, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workSpaceId', referencedColumnName: 'id' })
  workSpace: WorkSpaceEntity;

  @OneToMany(
    () => WorkSpaceGoogleCalendarEventEntity,
    (workSpaceGoogleCalendarEvent) => workSpaceGoogleCalendarEvent.calendar,
  )
  events: WorkSpaceGoogleCalendarEventEntity[];

  @OneToMany(
    () => WorkSpaceGoogleCalendarTokenEntity,
    (workSpaceGoogleCalendarToken) => workSpaceGoogleCalendarToken.calendar,
  )
  tokens: WorkSpaceGoogleCalendarTokenEntity[];
}
