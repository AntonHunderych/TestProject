import fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import { join } from 'node:path';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { initDB } from '../db/data-sourse';
import getRepos, { IRepos } from '../repos';
import getCryptoService from '../services/crypto/myCrypto';
import ICrypto from '../services/crypto/ICrypto';
import fastifyJwt from 'fastify-jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { skipAuthHook } from './hooks/skipAuthHook';
import { getUserDataFromJWT } from './plugins/getUserDataFromJWT';
import { IUserControllerResp } from '../controllers/users/createUser';
import { authHook } from './hooks/authHook';
import dotenv from 'dotenv';
import fastifyOauth2 from 'fastify-oauth2';
import { OAuth2Namespace } from '@fastify/oauth2';
import fastifyCookie from '@fastify/cookie';

dotenv.config();

declare module 'fastify' {
  export interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
    repos: IRepos;
    crypto: ICrypto;
    getUserDataFromJWT: (req: FastifyRequest) => IUserControllerResp;
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
  const f = fastify({ logger: true });

  f.register(fastifyJwt, {
    secret: 'your-secret-key',
  });

  console.log(process.env.GOOGLE_REDIRECT_URI);

  f.register(fastifyCookie)

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
    startRedirectPath: '/auth/google',
    callbackUri:process.env.GOOGLE_REDIRECT_URI!,
  });

  setupSwagger(f);

  //f.addHook('preHandler', authHook);
  f.addHook('preHandler', async function (request: FastifyRequest) {
    const userData = { ...f.getUserDataFromJWT(request), isAdmin: false };

    const user = await this.repos.userRepo.getUserById(userData.id);

    Object.assign(request, { userData: { ...userData, isAdmin: user.roles.some((r) => r.value === 'ADMIN') } });
  });

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
    () => {
      console.log('Server started on port 3000');
    },
  );

  return f;
}

export default run();
