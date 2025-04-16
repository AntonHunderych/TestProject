import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { ERole } from '../../../../types/enum/ERole';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { clearWorkSpaceUserCalendarData } from '../../../../controllers/ws/googleCalendar/clearWorkSpaceUserCalendarData';
import { ECalendarQueueEvents } from '../../../../types/enum/ECalendarQueue';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();
  const workSpaceGoogleCalendarTokenRepo = f.repos.workSpaceGoogleCalendarTokenRepo;

  f.addHook('preHandler', roleHook([ERole.USER]));
  f.addHook('preHandler', dataFetchHook);
  f.addHook('preHandler', accessToWorkSpaceHook);

  f.get('/connect', {}, async (req, reply) => {
    const client = f.getOAuth2Client();

    const url = client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      redirect_uri: 'http://127.0.0.1:3000/api/ws/calendars/callback',
      scope: 'https://www.googleapis.com/auth/calendar',
      state: req.workSpace.workSpaceUserId + '.' + req.workSpace.id,
    });

    return reply.redirect(url);
  });

  f.delete('/disconnect', {}, async (req) => {
    await clearWorkSpaceUserCalendarData(
      workSpaceGoogleCalendarTokenRepo,
      f.calendar,
      f.getOAuth2Client,
      req.workSpace.workSpaceUserId,
    );
  });

  f.post('/synchronize', {}, async (req) => {
    await f.addCalendarJob(ECalendarQueueEvents.synchronizeCalendar, {
      workSpaceId: req.workSpace.id,
      workSpaceUserId: req.workSpace.workSpaceUserId,
    });
  });
};

export default routes;
