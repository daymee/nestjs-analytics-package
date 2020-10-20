export enum DriverType {
  RMQ = 'rabbitmq',
  REDIS = 'redis',
}

export interface IAnalyticsArg {
  connectURL: string;
  driver: DriverType;
}

export interface IAnalyticsArg {
  connectURL: string;
  driver: DriverType;
  queue: string;
}
