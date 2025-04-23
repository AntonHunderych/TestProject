import fastify, { FastifyInstance } from 'fastify';
import fastifyAutoload from '@fastify/autoload';
import { join } from 'node:path';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { initDB, pgDataSource } from '../services/typeorm/data-sourse';
import getRepos from '../repos';
import getCryptoService from '../services/crypto/myCrypto';
import fastifyJwt from 'fastify-jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { skipAuthHook } from './hooks/skipAuthHook';
import { getUserDataFromJWT } from './plugins/getUserDataFromJWT';
import dotenv from 'dotenv';
import fastifyOauth2 from 'fastify-oauth2';
import fastifyCookie from '@fastify/cookie';
import { errorHandler } from './error/errorHandler';
import cors from '@fastify/cors';
import { getWithTransaction } from '../services/withTransaction/withTransaction';
import { getMailSender } from '../services/mailSender/SendGridMailSender';
import { getScheduler } from '../services/scheduler/Scheduler';
import { getNotification } from '../services/notification/Notification';
import { getGoogleCalendar } from '../services/calendar/googleCalendar';
import { getOAuth2Client } from '../services/OAuth2Client/getOAuth2Client';
import { AddCalendarJob } from '../services/queue/calendar/calendarQueue';
import { initCalendarWorker } from '../services/queue/calendar/calendarWorker';
import { getFileManagerS3 } from '../services/aws/s3/s3';
import { getPaymentStripe } from '../services/payment/stripe';
import { fastifyMultipart } from '@fastify/multipart';
import rawBodyPlugin from 'fastify-raw-body';
import rateLimit from '@fastify/rate-limit';
import '../types/TFastify';

dotenv.config();

function setupSwagger(f: FastifyInstance) {
  f.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0',
      },
      servers: [],
      security: [{ auth: [] }],
      components: {
        securitySchemes: {
          auth: {
            description: 'Authorization header token, sample: "Bearer {TOKEN}"',
            type: 'apiKey',
            name: 'authorization',
            in: 'header',
          },
        },
      },
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

  f.register(rateLimit, {
    max: 50,
    timeWindow: '1 minute',
    allowList: ['127.0.0.1'],
    ban: 2,
  });
  f.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });
  f.register(rawBodyPlugin, {
    field: 'rawBody',
    global: false,
    encoding: 'utf8',
    runFirst: true,
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
  f.decorate('withTransaction', getWithTransaction(pgDataSource));
  f.decorate('mailSender', getMailSender());
  f.decorate('scheduler', getScheduler());
  f.decorate('notification', getNotification(f.scheduler));
  f.decorate('getOAuth2Client', getOAuth2Client);
  f.decorate('calendar', getGoogleCalendar(f));
  f.decorate('addCalendarJob', AddCalendarJob);
  f.decorate('fileManager', getFileManagerS3());
  f.decorate('payment', getPaymentStripe(f));

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

  initCalendarWorker(f);

  f.listen(
    {
      port: 3000,
      host: '127.0.0.1',
    },
    (err) => {
      if (err) {
        f.log.error(err);
      }
      f.log.info('Server started on port 3000');
    },
  );

  return f;
}

export default run();
