import { TemplatePayloadMap } from '../../types/TTemplateSandGridData';
import { ESandGridTemplateID } from '../../types/enum/ESandGridTemplateID';

export type TemplateID = string;
export type HTML = string;

export type MailData =
  | {
      to: string | string[];
      subject: string;
      text: string;
      html?: HTML;
    }
  | {
      to: string | string[];
      subject: string;
      text?: string;
      html: string;
    }
  | {
      [K in ESandGridTemplateID]: {
        to: string | string[];
        subject: string;
        templateId: K;
        dynamic_template_data: TemplatePayloadMap[K];
      };
    }[ESandGridTemplateID];

export interface IMailSender {
  sendEmailToPerson(mailData: MailData): Promise<void>;
  sendEmailToPersons(mailData: MailData): Promise<void>;
}
