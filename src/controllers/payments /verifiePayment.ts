import { IPayment } from '../../types/services/payment';
import { FastifyRequest } from 'fastify';
import { handlePurchase } from './handlePurchase';

export async function verifyPaymentAndCheckCompleted(req: FastifyRequest, paymentService: IPayment) {
  return await paymentService.verifyPaymentAndCheckCompleted(req, handlePurchase);
}
