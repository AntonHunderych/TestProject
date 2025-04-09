import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkSpaceUserEntity } from './WorkSpaceUserEntity';
import { WorkSpaceCalendarEntity } from './WorkSpaceCalendarEntity';

@Entity('workSpaceGoogleCalendarToken')
export class WorkSpaceGoogleCalendarTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  userId: string;

  @Column()
  calendarId: string;

  @ManyToOne(() => WorkSpaceUserEntity, (workSpaceUserEntity) => workSpaceUserEntity.googleCalendarToken, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: WorkSpaceUserEntity;

  @ManyToOne(() => WorkSpaceCalendarEntity, (workSpaceCalendarEntity) => workSpaceCalendarEntity.tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'calendarId', referencedColumnName: 'id' })
  calendar: WorkSpaceCalendarEntity;
}
