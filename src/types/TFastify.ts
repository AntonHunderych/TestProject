import { OAuth2Namespace } from '@fastify/oauth2';
import { getOAuth2Client } from '../services/OAuth2Client/getOAuth2Client';
import { IRepos } from '../repos';
import ICrypto from '../services/crypto/ICrypto';
import { IWithTransaction } from '../services/withTransaction/IWithTransaction';
import { IMailSender } from '../services/mailSender/IMailSender';
import { IScheduler } from '../services/scheduler/IScheduler';
import { INotificationService } from '../services/notification/INotificationService';
import { ICalendar } from '../services/calendar/ICalendar';
import { AddCalendarJob } from '../services/queue/calendar/calendarQueue';
import { IFileManager } from './services/fileManager';
import { IPayment } from './services/payment';

declare module 'fastify' {
  export interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
    getOAuth2Client: typeof getOAuth2Client;
    repos: IRepos;
    crypto: ICrypto;
    withTransaction: IWithTransaction;
    getUserDataFromJWT: (req: FastifyRequest) => {
      id: string;
      username: string;
      email: string;
      workSpaceId?: string;
      workSpaceUserId?: string;
    };
    mailSender: IMailSender;
    scheduler: IScheduler;
    notification: INotificationService;
    calendar: ICalendar;
    addCalendarJob: typeof AddCalendarJob;
    fileManager: IFileManager;
    payment: IPayment;
  }

  export interface FastifyRequest {
    skipAuth?: boolean;
    userData: {
      id: string;
      username: string;
      email: string;
    };
    workSpace: {
      id: string;
      workSpaceUserId: string;
    };
    isAdmin: boolean;
  }
}
