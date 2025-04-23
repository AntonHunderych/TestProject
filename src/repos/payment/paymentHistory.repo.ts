import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { DataSource, EntityManager } from 'typeorm';
import { PaymentHistoryEntity } from '../../services/typeorm/entities/PaymentHistoryEntity';
import { DBError } from '../../types/errors/DBError';

export interface IPaymentHistory extends IRecreateRepo {
  createPayment(params: {
    service: 'stripe';
    paymentId: string;
    userId: string;
    currency: string;
    amountTotal: number;
  }): Promise<void>;
}

export function getPaymentHistoryRepo(db: DataSource | EntityManager): IPaymentHistory {
  const paymentHistoryRepo = db.getRepository(PaymentHistoryEntity);
  return {
    async createPayment(data) {
      try {
        await paymentHistoryRepo.createQueryBuilder().insert().values(data).execute();
      } catch (e) {
        throw new DBError('Error creating payment in history', e);
      }
    },
    __recreateFunction: getPaymentHistoryRepo,
  };
}
