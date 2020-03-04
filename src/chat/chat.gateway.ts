import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace: '/chat'})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;
  private Logger: Logger = new Logger('chatGateway');
  afterInit(server: any) {
    this.Logger.log('Initialized');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, message: { sender: string, room: string, message: string }) {
    console.log(message);
    this.wss.to(message.room).emit('chatToClient', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string){
    client.join(room);
    client.emit('joinedRoom', room)
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string){
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
