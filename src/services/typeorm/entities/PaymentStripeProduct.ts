import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentProductsEntity } from './PaymentProducts';

@Entity('paymentStripeProduct')
export class PaymentStripeProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  productId: string;

  @Column({ type: 'varchar' })
  stripeProductId: string;

  @Column({ type: 'varchar' })
  stripePriceId: string;

  @OneToOne(() => PaymentProductsEntity, (paymentProductEntity) => paymentProductEntity.stripeProduct, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: PaymentProductsEntity;
}
