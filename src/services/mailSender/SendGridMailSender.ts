import { IMailSender, MailData } from './IMailSender';
import sendGrid from '@sendgrid/mail';
import { ApplicationError } from '../../types/errors/ApplicationError';

export function getMailSender(): IMailSender {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY!);

  return {
    async sendEmailToPerson(mailData: MailData): Promise<void> {
      try {
        await sendGrid.send({
          ...mailData,
          from: process.env.SENDER_EMAIL!,
        });
      } catch (e: any) {
        throw new ApplicationError('Error sending email', e);
      }
    },
    async sendEmailToPersons(mailData: MailData): Promise<void> {
      try {
        await sendGrid.send({
          ...mailData,
          from: process.env.SENDER_EMAIL!,
          isMultiple: true,
        });
      } catch (e) {
        throw new ApplicationError('Error sending emails', e);
      }
    },
  };
}
