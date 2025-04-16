import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceGoogleCalendarTokenEntity } from './WorkSpaceGoogleCalendarTokenEntity';

@Entity({ name: 'workSpaceGoogleCalendarEvent' })
@Unique(['todoId', 'tokenId'])
export class WorkSpaceGoogleCalendarEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  todoId: string;

  @Column()
  eventId: string;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.googleCalendarEvents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId', referencedColumnName: 'id' })
  todo: WorkSpaceTodoEntity;

  @Column()
  tokenId: string;

  @ManyToOne(
    () => WorkSpaceGoogleCalendarTokenEntity,
    (workSpaceGoogleCalendarToken) => workSpaceGoogleCalendarToken.events,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'tokenId' })
  token: WorkSpaceGoogleCalendarTokenEntity;
}
