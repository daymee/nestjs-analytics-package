import { Inject, Injectable } from '@nestjs/common';
import { IDriver } from './interfaces/driver.interface';

@Injectable()
export class AnalyticService {
  constructor(
    @Inject('DaymeeAnalyticsDriver')
    private readonly driver: IDriver,
  ) { }
  
  push(event: string, payload: any) {
    this.driver.sendMessage(event, payload);
  }
}
