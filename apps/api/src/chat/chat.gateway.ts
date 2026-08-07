import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import {
  SERVER_EVENTS,
  convRoom,
  userRoom,
  type Message,
} from '@mtm/shared';

// Socket.IO CHỈ là kênh báo nhanh (best-effort). Không có gì "đảm bảo" ở đây —
// đảm bảo nằm ở seq + /sync. Reconnect do socket.io-client tự lo; client gọi /sync sau khi nối lại.
@WebSocketGateway({
  cors: { origin: process.env.WEB_ORIGIN ?? '*' },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server!: Server;

  constructor(private readonly prisma: PrismaService) {}

  async handleConnection(client: Socket) {
    // TODO(auth): verify JWT 1Office thay vì tin thẳng handshake.auth.userId
    const userId = client.handshake.auth?.userId as string | undefined;
    if (!userId) {
      client.disconnect(true);
      return;
    }
    client.data.userId = userId;
    client.join(userRoom(userId));

    // Join room từng hội thoại đang active để nhận broadcast
    const members = await this.prisma.conversationMember.findMany({
      where: { userId, status: 'active' },
      select: { conversationId: true },
    });
    for (const m of members) client.join(convRoom(m.conversationId));
  }

  emitMessageNew(message: Message) {
    this.server.to(convRoom(message.conversationId)).emit(SERVER_EVENTS.MESSAGE_NEW, { message });
  }

  emitMessageUpdated(message: Message) {
    this.server.to(convRoom(message.conversationId)).emit(SERVER_EVENTS.MESSAGE_UPDATED, { message });
  }
}
