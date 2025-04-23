import { IPaymentProduct } from '../../repos/payment/paymentProduct.repo';

export async function getAllPaymentsProducts(paymentProductRepo: IPaymentProduct) {
  return await paymentProductRepo.getProducts();
}
