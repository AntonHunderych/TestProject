import { PaymentProductsEntity } from '../../services/typeorm/entities/PaymentProducts';
import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { DataSource, EntityManager } from 'typeorm';
import { DBError } from '../../types/errors/DBError';

export interface IPaymentProduct extends IRecreateRepo {
  getProductById(productId: string): Promise<PaymentProductsEntity>;
  getProducts(): Promise<PaymentProductsEntity[]>;
}

export function getPaymentProductRepo(db: DataSource | EntityManager): IPaymentProduct {
  const paymentProductRepo = db.getRepository(PaymentProductsEntity);
  return {
    async getProductById(productId: string): Promise<PaymentProductsEntity> {
      try {
        return await paymentProductRepo.findOneOrFail({
          where: { id: productId },
          relations: {
            stripeProduct: true,
          },
        });
      } catch (e) {
        throw new DBError('Error getting payment product', e);
      }
    },
    async getProducts(): Promise<PaymentProductsEntity[]> {
      try {
        return await paymentProductRepo.find();
      } catch (e) {
        throw new DBError('Error getting payment products', e);
      }
    },
    __recreateFunction: getPaymentProductRepo,
  };
}
