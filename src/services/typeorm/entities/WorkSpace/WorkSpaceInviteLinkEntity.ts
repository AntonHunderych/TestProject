import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity({ name: 'workSpaceInviteLink' })
@Index(['userId', 'workspaceId'], { unique: true })
export class WorkSpaceInviteLinkEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  workspaceId: string;

  @Column('uuid')
  userId: string;

  @Column()
  token: string;

  @Column()
  salt: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
