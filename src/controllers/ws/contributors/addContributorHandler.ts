import { ITodoContributorRepo } from '../../../repos/workspace/todoContributor/todoContributor.repo';
import { INotificationService } from '../../../services/notification/INotificationService';
import { IMailSender } from '../../../services/mailSender/IMailSender';
import { addContributors } from './addContributors';
import { setNotificationToUser } from '../notification/setNotificationToUser';
import { getTodoContributor } from './getTodoContributor';
import { sendNotificationEmailToContributor } from '../notification/sendNotificationEmailToContributor';

export async function addContributorHandler(
  notification: INotificationService,
  mailService: IMailSender,
  workSpaceContributors: ITodoContributorRepo,
  userId: string,
  todoId: string,
) {
  await addContributors(workSpaceContributors, userId, todoId);
  const contributor = await getTodoContributor(workSpaceContributors, todoId, userId);
  if (contributor.todo.notification) {
    await setNotificationToUser(
      notification,
      contributor.userId + contributor.todoId,
      contributor.todo.eliminatedDate,
      () => sendNotificationEmailToContributor(mailService, contributor.todo, contributor.user),
    );
  }
}
