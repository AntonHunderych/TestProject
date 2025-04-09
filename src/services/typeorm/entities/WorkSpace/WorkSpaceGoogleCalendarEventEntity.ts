import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceCalendarEntity } from './WorkSpaceCalendarEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';

@Entity({ name: 'workSpaceGoogleCalendarEvent' })
export class WorkSpaceGoogleCalendarEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  todoId: string;
  calendarId: string;
  userId: string;
  eventId: string;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.googleCalendarEvents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId', referencedColumnName: 'id' })
  todo: WorkSpaceTodoEntity;

  @ManyToOne(() => WorkSpaceCalendarEntity, (workSpaceCalendar) => workSpaceCalendar.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'calendarId', referencedColumnName: 'id' })
  calendar: WorkSpaceCalendarEntity;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.googleCalendarEvents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: WorkSpaceUserEntity;
}
