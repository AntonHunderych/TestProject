import { FastifyInstance, FastifyRequest } from 'fastify';
import z from 'zod';

export const metadataSchema = z.object({
  userId: z.string(),
  productIdProject: z.string(),
});

export type TMetadata = z.infer<typeof metadataSchema>;

export interface IPayment {
  createPayment(data: { productIdPaymentSystem: string; quantity: number }, metadata: TMetadata): Promise<string>;
  verifyPaymentAndCheckCompleted(
    req: FastifyRequest,
    handlePurchase: (f: FastifyInstance, data: TMetadata) => Promise<void>,
  ): Promise<void>;
}
