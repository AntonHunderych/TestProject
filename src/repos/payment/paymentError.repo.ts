import { IRecreateRepo } from '../../types/IRecreatebleRepo';
import { DataSource, EntityManager } from 'typeorm';
import { PaymentErrorEntity } from '../../services/typeorm/entities/PaymentErrorEntity';
import { DBError } from '../../types/errors/DBError';

export interface IPaymentError extends IRecreateRepo {
  logError(params: { paymentId: string; userId: string; error: string }): Promise<void>;
}

export function getPaymentErrorRepo(db: DataSource | EntityManager): IPaymentError {
  const repo = db.getRepository(PaymentErrorEntity);

  return {
    async logError(data) {
      try {
        await repo.createQueryBuilder().insert().into(PaymentErrorEntity).values(data).execute();
      } catch (e) {
        throw new DBError('Error logging payment error', e);
      }
    },

    __recreateFunction: getPaymentErrorRepo,
  };
}
