export type TNotificationData = {
  userId: string;
  callback: () => Promise<void>;
};
