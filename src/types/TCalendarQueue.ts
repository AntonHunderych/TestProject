import { ECalendarQueueEvents } from './enum/ECalendarQueue';
import { WorkSpaceTodoEntity } from '../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { WorkSpaceGoogleCalendarTokenEntity } from '../services/typeorm/entities/WorkSpace/WorkSpaceGoogleCalendarTokenEntity';

export type TCalendarQueueData = {
  [ECalendarQueueEvents.insertTodoSynchronize]: {
    workSpaceId: string;
    todo: WorkSpaceTodoEntity;
  };
  [ECalendarQueueEvents.updateTodoSynchronize]: {
    workSpaceId: string;
    todo: WorkSpaceTodoEntity;
    newTodoData: Partial<WorkSpaceTodoEntity>;
  };
  [ECalendarQueueEvents.deleteTodoSynchronize]: {
    todo: WorkSpaceTodoEntity;
    tokensToProcess: WorkSpaceGoogleCalendarTokenEntity[];
  };
  [ECalendarQueueEvents.synchronizeCalendar]: {
    workSpaceId: string;
    workSpaceUserId: string;
  };
};
