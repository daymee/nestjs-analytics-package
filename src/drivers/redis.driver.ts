import * as redis from 'redis';
import { IDriver } from '../interfaces/driver.interface';

export class RedisDriver implements IDriver {
  private publisher: any;

  constructor(connectURL: string) {
    this.publisher = redis.createClient({
      url: connectURL,
    });
  }

  async sendMessage(event: string, payload: any) {
    this.publisher.publish(event, payload);
  }
}