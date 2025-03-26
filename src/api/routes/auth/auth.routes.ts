import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { loginSchema } from './schemas/loginSchema';
import { login } from '../../../controllers/auth/login';
import { tokenResponseSchema } from './schemas/tokenResponseSchema';
import { skipAuthHook } from '../../hooks/skipAuthHook';
import { refreshToken } from '../../../controllers/auth/refreshToken';
import { ErrorSchema } from '../schemas/ErrorSchema';
import { registerSchema } from './schemas/registerSchema';
import { HttpError } from '../../error/HttpError';
import { registrationProcess } from '../../../controllers/auth/registrationProcess';
import { randomBytes } from 'node:crypto';
import { existUser } from '../../../controllers/users/existUser';
import { generateTokensThenGetAccessToken } from '../../../controllers/auth/generateTokensThenGetAccessToken';
import { getUserDataFromGoogle } from '../../../controllers/auth/getUserDataFromGoogle';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const userRepo = f.repos.userRepo;
  const userRoleRepo = f.repos.userRoleRepo;
  const tokenRepo = f.repos.tokenRepo;
  const roleRepo = f.repos.roleRepo;
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
      const accessToken = await registrationProcess(
        userRepo,
        userRoleRepo,
        tokenRepo,
        roleRepo,
        crypto,
        f.jwt,
        req.body,
        reply,
      );
      return { token: accessToken };
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
        const accessToken = await generateTokensThenGetAccessToken(user, f.jwt, tokenRepo, reply);
        return { token: accessToken };
      } catch (e: any) {
        throw new HttpError(400, 'Bad data');
      }
    },
  );

  f.get('/google/callback', {}, async (req, reply) => {
    const googleUser = await getUserDataFromGoogle(req, f.googleOAuth2);
    const user = await existUser(userRepo, googleUser.email);
    if (!user) {
      const accessToken = await registrationProcess(
        userRepo,
        userRoleRepo,
        tokenRepo,
        roleRepo,
        crypto,
        f.jwt,
        {
          ...googleUser,
          password: randomBytes(16).toString('hex'),
        },
        reply,
      );
      return { accessToken };
    } else {
      const accessToken = await generateTokensThenGetAccessToken(
        {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        f.jwt,
        tokenRepo,
        reply,
      );
      return { accessToken };
    }
  });
};

export default routes;
