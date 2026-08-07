import { db, PENDING_SEQ, type LocalMessage } from './db';
import { api, currentUserId } from './api';
import type { MessageType } from '@mtm/shared';

// Optimistic gửi + outbox bền vững. Retry backoff; quá 3 lần -> "failed", giữ trong outbox
// (mở app lại vẫn còn, tự gửi khi có mạng).
const MAX_ATTEMPTS = 3;
const BACKOFF_MS = [2000, 4000, 8000];

export async function sendText(conversationId: string, content: string, replyToId: string | null = null) {
  const clientMsgId = crypto.randomUUID();
  const now = new Date().toISOString();

  const optimistic: LocalMessage = {
    id: `local:${clientMsgId}`,
    conversationId,
    senderId: currentUserId(),
    clientMsgId,
    seq: PENDING_SEQ, // luôn nằm cuối cho tới khi có seq thật
    type: 'text',
    content,
    replyToId,
    createdAt: now,
    editedAt: null,
    deletedAt: null,
    status: 'pending',
  };

  await db.transaction('rw', db.messages, db.outbox, async () => {
    await db.messages.put(optimistic);
    await db.outbox.put({
      clientMsgId,
      conversationId,
      type: 'text' as MessageType,
      content,
      replyToId,
      createdAt: now,
      attempts: 0,
      status: 'pending',
    });
  });

  void flushOutbox();
}

let flushing = false;

export async function flushOutbox(): Promise<void> {
  if (flushing || !navigator.onLine) return;
  flushing = true;
  try {
    const items = await db.outbox.where('status').equals('pending').toArray();
    for (const it of items) {
      try {
        const { message } = await api.sendMessage({
          conversationId: it.conversationId,
          clientMsgId: it.clientMsgId, // giữ nguyên -> server idempotent
          type: it.type,
          content: it.content,
          replyToId: it.replyToId,
        });
        // Thay tin optimistic bằng tin thật (id + seq thật) rồi xoá khỏi outbox.
        await db.transaction('rw', db.messages, db.outbox, async () => {
          await db.messages.delete(`local:${it.clientMsgId}`);
          await db.messages.put({ ...message, status: 'sent' });
          await db.outbox.delete(it.clientMsgId);
        });
      } catch {
        const attempts = it.attempts + 1;
        if (attempts >= MAX_ATTEMPTS) {
          await db.outbox.update(it.clientMsgId, { attempts, status: 'failed' });
          await db.messages.update(`local:${it.clientMsgId}`, { status: 'failed' });
        } else {
          await db.outbox.update(it.clientMsgId, { attempts });
          setTimeout(() => void flushOutbox(), BACKOFF_MS[attempts - 1] ?? 8000);
        }
      }
    }
  } finally {
    flushing = false;
  }
}

// "Chạm để thử lại" cho tin failed
export async function retry(clientMsgId: string) {
  await db.outbox.update(clientMsgId, { status: 'pending', attempts: 0 });
  await db.messages.update(`local:${clientMsgId}`, { status: 'pending' });
  void flushOutbox();
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => void flushOutbox());
}
