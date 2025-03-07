import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { createUserSchema } from '../users/schemas/createUserSchema';
import createUserHandler from '../../../controllers/users/createUser';
import { RegisterSchema } from './schemas/registerSchema';
import { registerHandler } from '../../../controllers/auth/registerHandler';
import z from 'zod';
import { registerLoginRespSchema } from './schemas/registerLoginRespSchema';
import { skipAuthHook } from '../../hooks/skipAuthHook';
import { roleHook } from '../../hooks/roleHook';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const userRepo = f.repos.userRepo;
  const userRoleRepo = f.repos.userRoleRepo;
  const crypto = f.crypto;

  f.addHook('preValidation', skipAuthHook);
  f.addHook('preHandler', roleHook(['ADMIN', 'USER']));

  f.post(
    '/register',
    {
      schema: {
        body: createUserSchema,
        response: {
          200: registerLoginRespSchema,
        },
      },
    },
    async (req) => {
      const { hash, salt } = await crypto.hash(req.body.password);
      const token = f.jwt.sign(
        await createUserHandler(userRepo, userRoleRepo, {
          username: req.body.username,
          email: req.body.email,
          password: hash,
          salt,
        }),
      );
      return { token };
    },
  );

  f.post(
    '/login',
    {
      schema: {
        body: RegisterSchema,
        response: {
          400: z.object({
            message: z.string(),
          }),
          200: registerLoginRespSchema,
        },
      },
    },
    async (req, res) => {
      try {
        const token = f.jwt.sign(await registerHandler(userRepo, crypto, req.body.password, req.body.email));
        return { token };
      } catch (e: any) {
        res.status(400).send({
          message: e.message,
        });
      }
    },
  );
};

export default routes;
