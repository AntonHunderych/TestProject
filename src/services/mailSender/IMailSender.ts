export type MailData =
  | {
      to: string | string[];
      subject: string;
      text: string;
      html?: string;
    }
  | {
      to: string | string[];
      subject: string;
      text?: string;
      html: string;
    };

export interface IMailSender {
  sendEmailToPerson(mailData: MailData): Promise<void>;
  sendEmailToPersons(mailData: MailData): Promise<void>;
}
