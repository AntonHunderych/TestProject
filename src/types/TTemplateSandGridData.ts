import { ESandGridTemplateID } from './enum/ESandGridTemplateID';

export type TemplatePayloadMap = {
  [ESandGridTemplateID.InviteToWorkSpace]: {
    userName: string;
    inviterName: string;
    workSpaceName: string;
    inviteUrl: string;
    year: number;
  };
  [ESandGridTemplateID.RememberWorkSpaceTask]: {
    userName: string;
    taskName: string;
    workSpaceName: string;
    eliminatedData: string;
    year: number;
  };
};
