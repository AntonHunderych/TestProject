import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { skipAuthHook } from '../../../../hooks/skipAuthHook';
import { setGoogleCalendarToken } from '../../../../../controllers/ws/googleCalendar/setGoogleCalendarToken';
import { ApplicationError } from '../../../../../types/errors/ApplicationError';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceGoogleCalendarTokenRepo = f.repos.workSpaceGoogleCalendarTokenRepo;

  f.get(
    '/',
    {
      schema: {},
      preValidation: skipAuthHook,
    },
    async (req) => {
      try {
        const { code, state } = req.query as { code: string; state: string };

        const [workSpaceUserId, workSpaceId] = state.split('.');

        const { tokens } = await f.getOAuth2Client().getToken(code);

        await setGoogleCalendarToken(
          workSpaceGoogleCalendarTokenRepo,
          workSpaceUserId,
          tokens.refresh_token as string,
          workSpaceId,
        );
      } catch (e) {
        throw new ApplicationError('Error while getting Google Calendar token', e);
      }
    },
  );
};

export default routes;
