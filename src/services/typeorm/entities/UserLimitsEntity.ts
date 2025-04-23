import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity({ name: 'userLimits' })
export class UserLimitsEntity {
  @PrimaryColumn({ type: 'varchar' })
  userId: string;

  @Column({ type: 'int' })
  createdWorkSpaces: number;

  @Column({ type: 'int' })
  maxCreatedWorkspaces: number;

  @OneToOne(() => UserEntity, (user) => user.limits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
