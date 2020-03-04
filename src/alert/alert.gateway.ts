import {  WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace: '/alert'})
export class AlertGateway {
  @WebSocketServer() wss: Server;
  private Logger: Logger = new Logger('alertGateway');
  // @SubscribeMessage('alert')
  // handleMessage(client: any, payload: any): string {
  //   return 'Hello world!';
  // }
  sendToAll(msg: string){
    this.wss.emit('alertToClient', {type: 'Alert', message: msg});
  }
}
