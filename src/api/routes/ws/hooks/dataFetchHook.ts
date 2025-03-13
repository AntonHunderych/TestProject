import { preHandlerAsyncHookHandler } from 'fastify';
import z from 'zod';

export const dataFetchHook: preHandlerAsyncHookHandler = async function(request,reply){

  const workSpaceDataSchema = z.object({
    workSpaceId: z.string().min(1),
  });

  const data = workSpaceDataSchema.safeParse(request.userData)

  if(!data.data?.workSpaceId) {
    reply.code(401).send({message: "Bad token"})
    return
  }

  request.workSpace = {
    id: data.data.workSpaceId,
  }
}