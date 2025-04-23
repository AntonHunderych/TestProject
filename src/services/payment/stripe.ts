import { IPayment, metadataSchema, TMetadata } from '../../types/services/payment';
import { ApplicationError } from '../../types/errors/ApplicationError';
import Stripe from 'stripe';
import { FastifyInstance, FastifyRequest } from 'fastify';
import stripe from 'stripe';

export function getPaymentStripe(f: FastifyInstance): IPayment {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  return {
    async verifyPaymentAndCheckCompleted(
      req: FastifyRequest,
      handlePurchase: (f: FastifyInstance, data: TMetadata) => Promise<void>,
    ): Promise<void> {
      const signature = req.headers['stripe-signature'] as string;

      let event: stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody!,
          signature,
          'whsec_5762aad54c0427c77b03b8328d5d8f1e08a9196e3d3d8b81e6ca999d02276256',
        );
      } catch (err) {
        throw new ApplicationError('Abort! webhook signature verification failed.', err);
      }

      try {
        if (event.type === 'checkout.session.completed') {
          const session = event.data.object as stripe.Checkout.Session;
          if (!session.metadata) {
            throw new ApplicationError('No metadata in session');
          }
          const metadata = metadataSchema.parse(session.metadata);
          await f.withTransaction({ paymentHistoryRepo: f.repos.paymentHistoryRepo }, async (repos) => {
            await repos.paymentHistoryRepo.createPayment({
              service: 'stripe',
              paymentId: session.payment_intent as string,
              userId: metadata.userId,
              currency: session.currency!,
              amountTotal: session.amount_total!,
            });
            await handlePurchase(f, metadata);
          });
        }
      } catch (e) {
        const session = event.data.object as stripe.Checkout.Session;
        try {
          await f.withTransaction({ paymentErrorRepo: f.repos.paymentErrorRepo }, async (repos) => {
            await repos.paymentErrorRepo.logError({
              paymentId: session.payment_intent as string,
              userId: session.metadata!.userId,
              error: (e as Error).message,
            });
            await stripe.refunds.create({
              payment_intent: session.payment_intent as string,
            });
          });
        } catch (e) {
          await f.repos.paymentErrorRepo.logError({
            paymentId: session.payment_intent as string,
            userId: session.metadata!.userId,
            error: (e as Error).message,
          });
        }
      }
    },
    async createPayment(
      data: { productIdPaymentSystem: string; quantity: number },
      metadata: TMetadata,
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
          success_url: process.env.WEB_APP_URL + '/',
          cancel_url: process.env.WEB_APP_URL + '/',
        });
        return session.url!;
      } catch (e) {
        throw new ApplicationError('Error creating payment', e);
      }
    },
  };
}
