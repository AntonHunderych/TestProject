import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { loginSchema } from './schemas/loginSchema';
import { loginHandler } from '../../../controllers/auth/loginHandler';
import { tokenResponseSchema } from './schemas/tokenResponseSchema';
import { skipAuthHook } from '../../hooks/skipAuthHook';
import { generateTokens } from '../../../controllers/auth/generateTokens';
import { setRefreshTokenCookie } from '../../../controllers/auth/setRefreshTokenCookie';
import { refreshToken } from '../../../controllers/auth/refreshToken';
import { ErrorSchema } from '../schemas/ErrorSchema';
import { registerSchema } from './schemas/registerSchema';
import { registerHandler } from '../../../controllers/auth/registerHandler';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const userRepo = f.repos.userRepo;
  const userRoleRepo = f.repos.userRoleRepo;
  const tokenRepo = f.repos.tokenRepo;
  const crypto = f.crypto;

  f.addHook('preValidation', skipAuthHook);

  f.post(
    '/register',
    {
      schema: {
        body: registerSchema,
        response: {
          200: tokenResponseSchema
        }
      }
    },
    async (req, reply) => {
      try {
        const user = await registerHandler(userRepo, userRoleRepo, crypto, req.body);
        const { accessToken, refreshToken } = await generateTokens(user, f.jwt, tokenRepo);
        setRefreshTokenCookie(reply, refreshToken);
        return { token: accessToken };
      } catch (e) {
        console.log(e);
      }
    }
  );

  f.get(
    '/refresh',
    {
      schema: {
        response: {
          200: tokenResponseSchema,
          400: ErrorSchema
        }
      }
    },
    async (req, reply) => {
      if (req.cookies.refreshToken) {
        await refreshToken(req.cookies.refreshToken, f.jwt, tokenRepo);
      } else {
        reply.status(400).send({ message: 'No refresh token provided' });
      }
    }
  );

  f.post(
    '/login',
    {
      schema: {
        body: loginSchema,
        response: {
          200: tokenResponseSchema,
          400: ErrorSchema
        }
      }
    },
    async (req, reply) => {
      try {
        const user = await loginHandler(userRepo, crypto, req.body.password, req.body.email);
        const { accessToken, refreshToken } = await generateTokens(user, f.jwt, tokenRepo);
        setRefreshTokenCookie(reply, refreshToken);
        return { token: accessToken };
      } catch (e: any) {
        reply.status(400).send({
          message: e.message
        });
      }
    }
  );

  f.get(
    '/google/callback',
    {},
    async (req) => {
      const token = await f.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
      return { token };
    }
  );
};

export default routes;
