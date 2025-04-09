export interface SchedulerTask {
  stop(): any;
}

export interface IScheduler {
  schedule(time: Date, callBack: () => void): Promise<SchedulerTask>;
}
