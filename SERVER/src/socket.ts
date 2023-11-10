import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // Máy chủ WebSocket này có thể giao tiếp với các clients thông qua sự kiện và truyền dữ liệu giữa server và client
  @WebSocketServer()
  server: Server;

  /* handleEmitSocket({ data: "Hello, World!", event: "message", to: "room1" });
  data  => dữ liệu mà bạn muốn truyền đi cùng với sự kiện.  ex: message => tin nhắn
  event => tên của sự kiện mà bạn muốn phát đi. 
  to    => Đây là một tùy chọn, đặc biệt là phòng (room) hoặc client ID mà bạn muốn gửi sự kiện đến
*/
  handleEmitSocket({ data, event, to }) {
    if (event === 'message') {
      if (to) {
        this.server.to(to).emit(event, data);
        //  .to()   => trên đối tượng Server nhận 1 tham số room thui
        //  .emit() => event: tên sự kiện , data: dữ liệu của sự kiện
      } else {
        this.server.emit(event, data);
      }
    }
  }
  // nhận data emit và gửi đến on
  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket, // Decorator này inject đối tượng Socket của client gửi sự kiện "message".
    @MessageBody() data: any, //  inject dữ liệu mà client gửi kèm với sự kiện "message".
  ) {
    return this.sendToClient(socket.id, 'message', data);
  }
  sendToClient(clientId: string, event: string, data: any) {
    this.server.emit(event, data);
  }

  //--
  afterInit(socket: Socket): any {}

  // Được gọi khi một client kết nối đến máy chủ WebSocket.
  //  Đối tượng Socket đại diện cho kết nối mới được thiết lập.
  async handleConnection(socket: Socket) {
    console.log('connect', socket.id);
  }
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnect', socket.id);
  }
}
