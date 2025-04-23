import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('paymentHistory')
export class PaymentHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  service: 'stripe';

  @Column()
  paymentId: string;

  @Column()
  userId: string;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({ type: 'int' })
  amountTotal?: number;

  @CreateDateColumn()
  createdAt: Date;
}
