import { FastifyPluginAsyncZod, ZodTypeProvider } from 'fastify-type-provider-zod';
import { roleHook } from '../../../hooks/roleHook';
import { ERole } from '../../../../types/enum/ERole';
import { dataFetchHook } from '../hooks/dataFetchHook';
import { accessToWorkSpaceHook } from '../hooks/accessToWorkSpaceHook';
import { google } from 'googleapis';
import z from 'zod';

const routes: FastifyPluginAsyncZod = async (fastify) => {
  const f = fastify.withTypeProvider<ZodTypeProvider>();

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

  f.get(
    '/',
    {
      schema: {
        querystring: z.object({
          token: z.string(),
        }),
      },
    },
    async (req) => {
      const client = f.getOAuth2Client();
      client.setCredentials({
        refresh_token: req.query.token,
      });
      const calendar = google.calendar({ version: 'v3', auth: client });
      return await calendar.events.list({
        calendarId: 'primary',
      });
    },
  );
};

export default routes;
