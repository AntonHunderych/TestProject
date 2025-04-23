import { EProduct } from '../../types/enum/EProducts';
import { increaseMaxCreatedWorkSpace } from '../limits/workSpaceLimits/increaseMaxCreatedWorkSpace';
import { FastifyInstance } from 'fastify';
import { ApplicationError } from '../../types/errors/ApplicationError';

export async function handlePurchase(f: FastifyInstance, data: { productIdProject: string; userId: string }) {
  switch (data.productIdProject) {
    case EProduct.AntonyOnlyFans:
      console.log('Are you kool gay?');
      break;
    case EProduct.IncreaseWorkSpaceCount:
      await increaseMaxCreatedWorkSpace(f, data.userId, 3);
      break;
    default:
      throw new ApplicationError('Unknown product');
  }
}
