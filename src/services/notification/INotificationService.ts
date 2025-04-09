export interface INotificationService {
  setNotification(
    identifier: string,
    goalTime: Date,
    callback: () => Promise<void>,
    setToGoalTime?: boolean,
    intervalMs?: number,
    count?: number,
  ): Promise<void>;
  cancelNotification(identifier: string): Promise<void>;
}
