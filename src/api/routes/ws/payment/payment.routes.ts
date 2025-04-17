import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

  f.post('/', {}, async () => {
    f.payment.createPayment({ amount: 100, currency: 'USD' });
  });
};
export default routes;
