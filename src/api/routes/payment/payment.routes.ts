import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { skipAuthHook } from '../../hooks/skipAuthHook';
import { verifyPaymentAndCheckCompleted } from '../../../controllers/payments /verifiePayment';
import { createPayment } from '../../../controllers/payments /createPayment';
import z from 'zod';
import { getAllPaymentsProducts } from '../../../controllers/payments /getAllPaymentsProducts';
import { getPaymentProductSchema } from './schemas/getPaymentProductSchema';
import { createPaymentSchema } from './schemas/createPaymentSchema';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const paymentProductRepo = f.repos.paymentProductRepo;

  f.post(
    '/',
    {
      schema: {
        body: createPaymentSchema,
      },
    },
    async (req) => {
      return await createPayment(f.payment, paymentProductRepo, req.userData.id, req.body.productId);
    },
  );

  f.get(
    '/',
    {
      schema: {
        response: {
          200: z.array(getPaymentProductSchema),
        },
      },
    },
    async () => {
      return await getAllPaymentsProducts(paymentProductRepo);
    },
  );

  f.post('/webhook', { config: { rawBody: true }, preValidation: skipAuthHook }, async (req) => {
    await verifyPaymentAndCheckCompleted(req, f.payment);
  });
};
export default routes;
