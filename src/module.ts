import { DynamicModule, Module } from '@nestjs/common';

import { AnalyticService } from './service';
import { IDriver } from './interfaces/driver.interface';
import { IAnalyticsArg } from './interfaces/constructor.args';
import { createDriverProvider, getDriverByType } from './drivers';

@Module({})
export class AnalyticsModule {
  private static registerModule(args: IAnalyticsArg,  global: boolean = false): DynamicModule {
    const analyticsDriver: IDriver = getDriverByType(args);
    const AnalyticsDriverProvider = createDriverProvider(analyticsDriver);

    return {
      imports: [],
      global,
      providers: [
        AnalyticService,
        AnalyticsDriverProvider,
      ],
      exports: [
        AnalyticService,
      ],
      module: AnalyticsModule,
    }
  }

  static register(args: IAnalyticsArg): DynamicModule {
    return this.registerModule(args, false);
  }
  static registerForRoot(args: IAnalyticsArg): DynamicModule {
    return this.registerModule(args, true);
  }
}