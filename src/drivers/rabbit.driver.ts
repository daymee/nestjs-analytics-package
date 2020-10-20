import * as amqp from 'amqplib';
import { IDriver } from '../interfaces/driver.interface';

export class RabbitMQDriver implements IDriver {
  private readonly client: any;
  private readonly queue: string;
  private exchange: any;

  private defaultOpts: {
    reconnect: true,
    reconnectBackoffStrategy: 'linear', // or 'exponential'
    reconnectBackoffTime: 500, // ms
  };

  constructor(connectURL: string, queue: string) {
    this.client = amqp.createConnection({ url: connectURL }, this.defaultOpts);
    this.client.on('ready', this.initQueue);

    this.queue = queue;
  }


  private initQueue() {
    this.exchange = this.client.exchange('');
  }

  async sendMessage(event: string, payload: any) {
    this.exchange.publish(this.queue, {
      event,
      payload,
    });
  }
}