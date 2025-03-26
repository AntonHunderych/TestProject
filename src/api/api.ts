import fastify, { FastifyInstance } from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import { join } from 'node:path';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { initDB } from '../services/typeorm/data-sourse';
import getRepos, { IRepos } from '../repos';
import getCryptoService from '../services/crypto/myCrypto';
import ICrypto from '../services/crypto/ICrypto';
import fastifyJwt from 'fastify-jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { skipAuthHook } from './hooks/skipAuthHook';
import { getUserDataFromJWT } from './plugins/getUserDataFromJWT';
import dotenv from 'dotenv';
import fastifyOauth2 from 'fastify-oauth2';
import { OAuth2Namespace } from '@fastify/oauth2';
import fastifyCookie from '@fastify/cookie';
import { errorHandler } from './error/errorHandler';
import cors from '@fastify/cors';

dotenv.config();

declare module 'fastify' {
  export interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
    repos: IRepos;
    crypto: ICrypto;
    getUserDataFromJWT: (req: FastifyRequest) => { id: string; username: string; email: string };
  }

  export interface FastifyRequest {
    skipAuth?: boolean;
    userData: {
      id: string;
      username: string;
      email: string;
      isAdmin: boolean;
    };
    workSpace: {
      id: string;
    };
  }
}

function setupSwagger(f: FastifyInstance) {
  f.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0',
      },
      servers: [{ url: 'http://127.0.0.1:3000', description: 'Local server' }],
    },
    transform: jsonSchemaTransform,
  });

  f.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
}

async function run() {
  const f = fastify({
    logger: {
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          singleLine: true,
        },
      },
    },
  });

  process.on('uncaughtException', (err) => {
    f.log.error(err);
    process.exit(1);
  });
  process.on('unhandledRejection', (err) => {
    f.log.error(err);
    process.exit(1);
  });

  f.register(cors);
  f.register(fastifyJwt, {
    secret: 'your-secret-key',
  });
  f.register(fastifyCookie);
  f.register(fastifyOauth2, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID!,
        secret: process.env.GOOGLE_CLIENT_SECRET!,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/api/auth/google',
    callbackUri: process.env.GOOGLE_REDIRECT_URI!,
  });
  setupSwagger(f);

  f.setErrorHandler(errorHandler);

  f.decorate('repos', getRepos(await initDB()));
  f.decorate('crypto', getCryptoService());
  f.decorate('getUserDataFromJWT', getUserDataFromJWT);

  f.setValidatorCompiler(validatorCompiler);
  f.setSerializerCompiler(serializerCompiler);

  f.register(fastifyAutoload, {
    dir: join(__dirname, 'routes'),
    ignoreFilter: 'schemas',
    options: {
      prefix: '/api',
    },
    autoHooks: true,
    cascadeHooks: true,
    dirNameRoutePrefix: true,
  });

  f.get('/', { preHandler: skipAuthHook, schema: {} }, (_req, res) => {
    res.status(200).send({
      status: 'success',
    });
  });

  await f.ready();
  f.listen(
    {
      port: 3000,
      host: '127.0.0.1',
    },
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log('Server started on port 3000');
    },
  );

  return f;
}

export default run();
