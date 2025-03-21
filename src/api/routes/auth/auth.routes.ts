import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { createUserSchema } from '../users/schemas/createUserSchema';
import createUserHandler from '../../../controllers/users/createUser';
import { RegisterSchema } from './schemas/registerSchema';
import { loginHandler } from '../../../controllers/auth/loginHandler';
import z, { string } from 'zod';
import { registerLoginRespSchema } from './schemas/registerLoginRespSchema';
import { skipAuthHook } from '../../hooks/skipAuthHook';

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
        body: createUserSchema,
        response: {
          200: registerLoginRespSchema
        }
      }
    },
    async (req, reply) => {
      try {
        const { hash, salt } = await crypto.hash(req.body.password);
        const user = await createUserHandler(userRepo, userRoleRepo, {
          username: req.body.username,
          email: req.body.email,
          password: hash,
          salt
        });
        const accessToken = f.jwt.sign(user);
        const refreshToken = f.jwt.sign(user, { expiresIn: '7d' });
        await tokenRepo.createRefreshToken(user.id, refreshToken);
        reply.setCookie(
          'refreshToken',
          refreshToken,
          {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
          }
        );
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
          200: registerLoginRespSchema
        }
      }
    },
    async (req, reply) => {
      const refreshTokenDB = await tokenRepo.findTokenById(req.cookies.refreshToken!);
      if (refreshTokenDB.value !== req.cookies.refreshToken!) {
        throw new Error('Invalid refresh token');
      }
      const userData = f.jwt.verify(refreshTokenDB.value) as { id: string, email: string, username: string };
      return {
        token: f.jwt.sign({
          id: userData.id,
          email: userData.email,
          username: userData.username
        })
      };
    }
  );

  f.get(
    '/google/callback',
    {
      schema: {}
    },
    async (req) => {
      const token = await f.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
      return { token };
    }
  );

  f.post(
    '/login',
    {
      schema: {
        body: RegisterSchema,
        response: {
          400: z.object({
            message: z.string()
          }),
          200: registerLoginRespSchema
        }
      }
    },
    async (req, reply) => {
      try {
        const user = await loginHandler(userRepo, crypto, req.body.password, req.body.email);
        const accessToken = f.jwt.sign(user);
        const refreshToken = f.jwt.sign(user, { expiresIn: '7d' });
        reply.setCookie(
          'refreshToken',
          refreshToken,
          {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7
          }
        );
        return { token: accessToken };
      } catch (e: any) {
        reply.status(400).send({
          message: e.message
        });
      }
    }
  );
};

export default routes;
