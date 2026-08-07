import { db, buildCursors } from './db';
import { api } from './api';
import type { Message } from '@mtm/shared';

// /sync — lưới an toàn cuối. Gọi khi: mở app, mạng lên, socket reconnect.
export async function runSync(): Promise<void> {
  const res = await api.sync({ cursors: await buildCursors() });

  await db.transaction('rw', db.messages, db.conversations, async () => {
    for (const c of res.conversations) await db.conversations.put(c);

    for (const msgs of Object.values(res.messages)) {
      for (const m of msgs) await upsertServerMessage(m);
    }

    // Bị gỡ khỏi hội thoại: system message đã nằm trong res.messages ở trên,
    // giờ đánh dấu để UI hiện "bạn đã rời/bị gỡ" (giữ lịch sử, không xoá).
    for (const id of res.removed) {
      const conv = await db.conversations.get(id);
      if (conv) await db.conversations.put({ ...conv, type: 'archived' });
    }
  });

  if (res.truncated?.length) {
    // TODO: những hội thoại này bị cắt bớt (offline quá lâu) -> cần phân trang lịch sử.
    console.warn('sync truncated for', res.truncated);
  }
}

/** Ghi 1 tin từ server vào local, dedup theo clientMsgId (tránh nhân đôi tin của chính mình). */
export async function upsertServerMessage(m: Message): Promise<void> {
  // Nếu là echo tin của chính mình đang optimistic -> xoá bản local giả trước.
  await db.messages.delete(`local:${m.clientMsgId}`);
  await db.outbox.delete(m.clientMsgId);
  await db.messages.put({ ...m, status: 'sent' });
}
