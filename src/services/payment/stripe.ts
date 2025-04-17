import { IPayment } from '../../types/services/payment';
import { ApplicationError } from '../../types/errors/ApplicationError';
import Stripe from 'stripe';

export function getPaymentStripe(): IPayment {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  return {
    async createPayment(
      data: { productIdPaymentSystem: string; quantity: number },
      metadata: { userId: string; productIdProject: string },
    ): Promise<string> {
      try {
        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: ['card'],
          line_items: [
            {
              price: data.productIdPaymentSystem,
              quantity: data.quantity,
            },
          ],
          metadata,
        });
        return session.url!;
      } catch (e) {
        throw new ApplicationError('Error creating payment', e);
      }
    },
  };
}
