import { IPayment } from '../../types/services/payment';
import { PaymentProductsEntity } from '../../services/typeorm/entities/PaymentProducts';
import { IPaymentProduct } from '../../repos/payment/paymentProduct.repo';

export async function createPayment(
  payment: IPayment,
  paymentProductRepo: IPaymentProduct,
  userId: string,
  productIdProject: string,
) {
  const product: PaymentProductsEntity = await paymentProductRepo.getProductById(productIdProject);
  return await payment.createPayment(
    { productIdPaymentSystem: product.stripeProduct.stripePriceId, quantity: 1 },
    { userId, productIdProject },
  );
}
