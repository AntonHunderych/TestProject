import { FastifyReply, FastifyRequest } from 'fastify';
import util from 'util';
import { HttpError } from './HttpError';
import { EErrorCode } from '../../types/Enum/EErrorCode';


const isProduction = process.env.NODE_ENV === 'production';

export const errorHandler = function (error: Error, request: FastifyRequest, reply: FastifyReply) {
  request.log.error(error);

  let errorCode = EErrorCode.GENERAL_ERROR;
  let statusCode = 400;
  let message = 'Bad Request';

  if (error instanceof HttpError) {
    if (error.errorCode) {
      errorCode = error.errorCode;
    }

    statusCode = error.statusCode;
    message = error.message;
  }

  if ('statusCode' in error) {
    statusCode = error.statusCode as number;
  }

  return reply.status(statusCode).send({
    code: errorCode,
    message,
    ...(isProduction ? {} : { info: util.inspect(error) })
  });
};
