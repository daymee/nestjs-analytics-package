import { Provider } from '@nestjs/common';
import { ResourceType } from '@nestjs/common/interfaces/external/kafka-options.interface';
import { DriverType, IAnalyticsArg } from '../interfaces/constructor.args';
import { IDriver } from '../interfaces/driver.interface';
import { RabbitMQDriver } from './rabbit.driver';
import { RedisDriver } from './redis.driver';

export function getDriverByType(args: IAnalyticsArg): IDriver {
  switch (args.driver) {
    case DriverType.REDIS:
      return new RedisDriver(args.connectURL);
    case DriverType.RMQ:
      return new RabbitMQDriver(args.connectURL, args.queue);
  }
}

export function createDriverProvider(driver: IDriver): Provider {
  return {
    provide: 'DaymeeAnalyticsDriver',
    useExisting: driver,
  };
}