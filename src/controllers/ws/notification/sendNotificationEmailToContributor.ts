import { IMailSender } from '../../../services/mailSender/IMailSender';
import { ESandGridTemplateID } from '../../../types/enum/ESandGridTemplateID';
import { WorkSpaceTodoEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceTodoEntity';
import { WorkSpaceUserEntity } from '../../../services/typeorm/entities/WorkSpace/WorkSpaceUserEntity';

export async function sendNotificationEmailToContributor(
  mailSender: IMailSender,
  todo: WorkSpaceTodoEntity,
  userData: WorkSpaceUserEntity,
) {
  await mailSender.sendEmailToPerson({
    to: userData.user.email,
    subject: 'TestProject: Reminder',
    templateId: ESandGridTemplateID.RememberWorkSpaceTask,
    dynamic_template_data: {
      userName: userData.user.username,
      workSpaceName: userData.workSpace.name,
      taskName: todo.title,
      eliminatedData: todo.eliminatedDate!.toString(),
      year: new Date().getFullYear(),
    },
  });
}
