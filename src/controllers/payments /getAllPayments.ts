import { IPaymentProduct } from '../../repos/payment/paymentProduct.repo';

export async function getAllPayments(paymentProductRepo: IPaymentProduct) {
  return await paymentProductRepo.getProducts();
}
