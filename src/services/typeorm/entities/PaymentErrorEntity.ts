import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'paymentError' })
export class PaymentErrorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  paymentId: string;

  @Column()
  userId: string;

  @Column()
  error: string;

  @CreateDateColumn()
  createdAt: Date;
}
