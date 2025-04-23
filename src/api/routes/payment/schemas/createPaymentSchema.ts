import z from 'zod';

export const createPaymentSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});
