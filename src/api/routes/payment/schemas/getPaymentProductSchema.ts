import z from 'zod';

export const getPaymentProductSchema = z.object({
  id: z.string(),
  productName: z.string(),
  description: z.string(),
  amount: z.number(),
});
