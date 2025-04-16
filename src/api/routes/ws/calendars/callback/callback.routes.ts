import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { skipAuthHook } from '../../../../hooks/skipAuthHook';
import { setGoogleCalendarToken } from '../../../../../controllers/ws/googleCalendar/setGoogleCalendarToken';
import { ApplicationError } from '../../../../../types/errors/ApplicationError';
import { initWorkSpaceCalendar } from '../../../../../controllers/ws/googleCalendar/initWorkSpaceCalendar';
import { ECalendarQueueEvents } from '../../../../../types/enum/ECalendarQueue';
import { HttpError } from '../../../../error/HttpError';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceGoogleCalendarTokenRepo = f.repos.workSpaceGoogleCalendarTokenRepo;
  const workSpaceRepo = f.repos.workSpaceRepo;

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

        if (await workSpaceGoogleCalendarTokenRepo.userHaveToken(workSpaceUserId)) {
          throw new HttpError(400, 'User already has a token');
        }

        const calendarId = await initWorkSpaceCalendar(workSpaceRepo, workSpaceId, tokens, f.getOAuth2Client);
        await setGoogleCalendarToken(
          workSpaceGoogleCalendarTokenRepo,
          workSpaceUserId,
          tokens.refresh_token as string,
          workSpaceId,
          calendarId,
        );
        await f.addCalendarJob(ECalendarQueueEvents.synchronizeCalendar, {
          workSpaceId,
          workSpaceUserId,
        });
      } catch (e) {
        throw new ApplicationError('Error while getting Google Calendar token', e);
      }
    },
  );
};

export default routes;
