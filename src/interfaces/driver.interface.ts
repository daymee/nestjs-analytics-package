export interface IDriver {
  sendMessage(event: string, payload: any): Promise<void>;
}