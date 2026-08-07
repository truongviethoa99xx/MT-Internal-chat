import { io, type Socket } from 'socket.io-client';
import { SERVER_EVENTS, type MessageNewPayload, type MessageUpdatedPayload } from '@mtm/shared';
import { db, lastSeqOf } from './db';
import { currentUserId } from './api';
import { runSync, upsertServerMessage } from './sync';

const BASE = (import.meta.env.VITE_API_URL as string) ?? 'http://localhost:3000';

let socket: Socket | null = null;

export function connectSocket(): Socket {
  if (socket) return socket;

  socket = io(BASE, {
    auth: { userId: currentUserId() },
    // socket.io tự reconnect backoff; nối lại xong ta gọi /sync ngay.
    reconnectionDelay: 1000,
    reconnectionDelayMax: 30000,
  });

  // Mỗi lần (re)connect -> kéo bù để chắc chắn không sót trong lúc rớt.
  socket.on('connect', () => void runSync());

  socket.on(SERVER_EVENTS.MESSAGE_NEW, async ({ message }: MessageNewPayload) => {
    const localLast = await lastSeqOf(message.conversationId);
    if (message.seq > localLast + 1) {
      // Nhảy cóc -> hụt tin ở giữa -> kéo bù thay vì ghi thẳng.
      await runSync();
    } else {
      await upsertServerMessage(message);
    }
  });

  socket.on(SERVER_EVENTS.MESSAGE_UPDATED, async ({ message }: MessageUpdatedPayload) => {
    // sửa / thu hồi: ghi đè theo id (giữ đúng seq).
    await db.messages.put({ ...message, status: 'sent' });
  });

  return socket;
}
