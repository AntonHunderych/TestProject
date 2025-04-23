import { Worker } from 'bullmq';
import { ECalendarQueueEvents } from '../../../types/enum/ECalendarQueue';
import { ApplicationError } from '../../../types/errors/ApplicationError';
import { insertTodoSynchronizeGoogleCalendar } from '../../../controllers/ws/googleCalendar/synchronize/insertTodoSynchronizeGoogleCalendar';
import { TCalendarQueueData } from '../../../types/TCalendarQueue';
import { updateTodoSynchronizeGoogleCalendar } from '../../../controllers/ws/googleCalendar/synchronize/updateTodoSynchronizeGoogleCalendar';
import { deleteTodoSynchronizeGoogleCalendar } from '../../../controllers/ws/googleCalendar/synchronize/deleteTodoSynchronizeGoogleCalendar';
import { FastifyInstance } from 'fastify';
import { synchronizeCalendar } from '../../../controllers/ws/googleCalendar/synchronize/synchronizeCalendar';
import { getTokensFilteredByUserCommand } from '../../../controllers/ws/googleCalendar/synchronize/getTokensFilteredByUserCommand';

export function initWorker(f: FastifyInstance) {
  const worker = new Worker(
    'calendarTask',
    async (job) => {
      try {
        switch (job.data.type) {
          case ECalendarQueueEvents.insertTodoSynchronize: {
            const { workSpaceId, todo } = job.data
              .data as TCalendarQueueData[ECalendarQueueEvents.insertTodoSynchronize];

            todo.createdAt = new Date(todo.createdAt);
            todo.eliminatedDate = todo.eliminatedDate ? new Date(todo.eliminatedDate) : undefined;

            await insertTodoSynchronizeGoogleCalendar(
              f.calendar,
              f.repos.workSpaceGoogleCalendarTokenRepo,
              f.repos.workSpaceGoogleCalendarEventRepo,
              workSpaceId,
              todo,
            );
            break;
          }
          case ECalendarQueueEvents.updateTodoSynchronize: {
            const { workSpaceId, todo, newTodoData } = job.data
              .data as TCalendarQueueData[ECalendarQueueEvents.updateTodoSynchronize];

            todo.createdAt = new Date(todo.createdAt);
            todo.eliminatedDate = todo.eliminatedDate ? new Date(todo.eliminatedDate) : undefined;
            newTodoData.eliminatedDate = newTodoData.eliminatedDate ? new Date(newTodoData.eliminatedDate) : undefined;

            await updateTodoSynchronizeGoogleCalendar(
              f.calendar,
              f.repos.workSpaceGoogleCalendarTokenRepo,
              f.repos.workSpaceGoogleCalendarEventRepo,
              workSpaceId,
              todo,
              newTodoData,
            );
            break;
          }
          case ECalendarQueueEvents.deleteTodoSynchronize: {
            const { todo, tokensToProcess } = job.data
              .data as TCalendarQueueData[ECalendarQueueEvents.deleteTodoSynchronize];

            await deleteTodoSynchronizeGoogleCalendar(
              f.calendar,
              f.repos.workSpaceGoogleCalendarEventRepo,
              todo,
              tokensToProcess,
            );
            break;
          }
          case ECalendarQueueEvents.synchronizeCalendar: {
            const { workSpaceId, workSpaceUserId } = job.data
              .data as TCalendarQueueData[ECalendarQueueEvents.synchronizeCalendar];
            await synchronizeCalendar(
              f.calendar,
              f.repos.workSpaceGoogleCalendarTokenRepo,
              f.repos.workSpaceGoogleCalendarEventRepo,
              f.repos.workSpaceTodoRepo,
              workSpaceUserId,
              workSpaceId,
            );
            break;
          }
          case ECalendarQueueEvents.updateTodoCommandSynchronize: {
            const { workSpaceId, todo, pastCommandId } = job.data
              .data as TCalendarQueueData[ECalendarQueueEvents.updateTodoCommandSynchronize];

            todo.createdAt = new Date(todo.createdAt);
            todo.eliminatedDate = todo.eliminatedDate ? new Date(todo.eliminatedDate) : undefined;

            const tokensToDelete = await getTokensFilteredByUserCommand(
              pastCommandId,
              todo.id,
              workSpaceId,
              f.repos.workSpaceGoogleCalendarTokenRepo,
            );
            await deleteTodoSynchronizeGoogleCalendar(
              f.calendar,
              f.repos.workSpaceGoogleCalendarEventRepo,
              todo,
              tokensToDelete,
            );
            await insertTodoSynchronizeGoogleCalendar(
              f.calendar,
              f.repos.workSpaceGoogleCalendarTokenRepo,
              f.repos.workSpaceGoogleCalendarEventRepo,
              workSpaceId,
              todo,
            );
            break;
          }
          default:
            throw new Error(`Unknown calendar job type: ${job.data.type}`);
        }
      } catch (e) {
        throw new ApplicationError('Error in calendar worker', e);
      }
    },
    {
      connection: {
        host: 'localhost',
        port: 6379,
      },
    },
  );

  worker.on('failed', (job, err) => {
    console.error(`❌ Job ${job!.id} failed with error:`, err);
  });
}
