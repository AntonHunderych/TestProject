import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { loginSchema } from './schemas/loginSchema';
import { login } from '../../../controllers/auth/login';
import { tokenResponseSchema } from './schemas/tokenResponseSchema';
import { skipAuthHook } from '../../hooks/skipAuthHook';
import { generateTokens } from '../../../controllers/auth/generateTokens';
import { setRefreshTokenCookie } from '../../../controllers/auth/setRefreshTokenCookie';
import { refreshToken } from '../../../controllers/auth/refreshToken';
import { ErrorSchema } from '../schemas/ErrorSchema';
import { registerSchema } from './schemas/registerSchema';
import { register } from '../../../controllers/auth/register';
import { HttpError } from '../../error/HttpError';

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
          200: tokenResponseSchema,
        },
      },
    },
    async (req, reply) => {
      try {
        const user = await register(userRepo, userRoleRepo, crypto, req.body);
        const { accessToken, refreshToken } = await generateTokens(user, f.jwt, tokenRepo);
        setRefreshTokenCookie(reply, refreshToken);
        return { token: accessToken };
      } catch (e) {
        throw e;
      }
    },
  );

  f.get(
    '/refresh',
    {
      schema: {
        response: {
          200: tokenResponseSchema,
          400: ErrorSchema,
        },
      },
    },
    async (req) => {
      if (req.cookies.refreshToken) {
        await refreshToken(req.cookies.refreshToken, f.jwt, tokenRepo);
      } else {
        throw new HttpError(400, 'No refresh token provided');
      }
    },
  );

  f.post(
    '/login',
    {
      schema: {
        body: loginSchema,
        response: {
          200: tokenResponseSchema,
          400: ErrorSchema,
        },
      },
    },
    async (req, reply) => {
      try {
        const user = await login(userRepo, crypto, req.body.password, req.body.email);
        const { accessToken, refreshToken } = await generateTokens(user, f.jwt, tokenRepo);
        setRefreshTokenCookie(reply, refreshToken);
        return { token: accessToken };
      } catch (e: any) {
        throw new HttpError(400, 'Bad data');
      }
    },
  );

  f.get('/google/callback', {}, async (req) => {
    const token = await f.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
    return { token };
  });
};

export default routes;
