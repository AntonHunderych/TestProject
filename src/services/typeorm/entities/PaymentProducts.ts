import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentStripeProductEntity } from './PaymentStripeProduct';

@Entity('paymentProducts')
export class PaymentProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  productName: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  amount: number;

  @OneToOne(() => PaymentStripeProductEntity, (paymentStripeProductEntity) => paymentStripeProductEntity.product)
  stripeProduct: PaymentStripeProductEntity;
}
