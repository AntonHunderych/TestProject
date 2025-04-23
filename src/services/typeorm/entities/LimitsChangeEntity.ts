import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EUserLimits } from '../../../types/enum/EUserLimits';

@Entity({ name: 'limitsChange' })
export class LimitsChangeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  limitName: EUserLimits;

  @Column({ type: 'int' })
  previousLimit: number;

  @Column({ type: 'int' })
  currentLimit: number;

  @CreateDateColumn()
  createdAt: Date;
}
