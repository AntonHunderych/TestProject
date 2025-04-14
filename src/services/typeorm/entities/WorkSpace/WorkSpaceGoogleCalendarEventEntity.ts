import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { WorkSpaceTodoEntity } from './WorkSpaceTodoEntity';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceEntity } from './WorkSpaceEntity';

@Entity({ name: 'workSpaceGoogleCalendarEvent' })
@Unique(['todoId', 'userId', 'workSpaceId'])
export class WorkSpaceGoogleCalendarEventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  todoId: string;

  @Column()
  workSpaceId: string;

  @Column()
  userId: string;

  @Column()
  eventId: string;

  @ManyToOne(() => WorkSpaceTodoEntity, (workSpaceTodo) => workSpaceTodo.googleCalendarEvents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'todoId', referencedColumnName: 'id' })
  todo: WorkSpaceTodoEntity;

  @ManyToOne(() => WorkSpaceEntity, (workSpaceEntity) => workSpaceEntity.events, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workSpaceId', referencedColumnName: 'id' })
  workSpace: WorkSpaceEntity;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUser) => workSpaceUser.googleCalendarEvents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: WorkSpaceUserEntity;
}
