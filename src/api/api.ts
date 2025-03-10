import fastify, { FastifyInstance } from 'fastify';
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
import { authHook } from './hooks/authHook';
import { getUserDataFromJWT } from './plugins/getUserDataFromJWT';
import { IUserControllerResp } from '../controllers/users/createUser';

declare module 'fastify' {
  export interface FastifyInstance {
    repos: IRepos;
    crypto: ICrypto;
    getUserDataFromJWT: (req: FastifyRequest) => IUserControllerResp;
  }

  export interface FastifyRequest {
    skipAuth?: boolean;
  }
}



function setupSwagger(f:FastifyInstance ) {
  f.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0'
      },
      servers: [{ url: 'http://127.0.0.1:3000', description: 'Local server' }]
    },
   transform: jsonSchemaTransform
  });

  f.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });
}

async function run() {
  const f = fastify({ logger: true });

  f.register(fastifyJwt, {
    secret: 'your-secret-key' // Ваш секретний ключ для підпису токенів
  });

  setupSwagger(f);

  f.addHook('preHandler', authHook);

  f.decorate('repos', getRepos(await initDB()));
  f.decorate('crypto', getCryptoService());
  f.decorate('getUserDataFromJWT', getUserDataFromJWT);

  f.setValidatorCompiler(validatorCompiler);
  f.setSerializerCompiler(serializerCompiler);

  f.register(fastifyAutoload, {
    dir: join(__dirname, 'routes'),
    ignoreFilter: 'schemas',
    options: {
      prefix: '/api'
    },
    autoHooks: true,
    cascadeHooks: true,
    dirNameRoutePrefix: true,
  });

  f.get('/', { preHandler: skipAuthHook, schema:{} }, (_req, res) => {
    res.status(200).send({
      status: 'success'
    });
  });

  await f.ready();
  f.listen(
    {
      port: 3000,
      host: '127.0.0.1'
    },
    () => {
      console.log('Server started on port 3000');
    }
  );

  return f
}



export default run();
