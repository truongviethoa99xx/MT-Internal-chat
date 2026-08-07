import Dexie, { type Table } from 'dexie';
import type { Conversation, Message, MessageStatus } from '@mtm/shared';

// IndexedDB LÀ nguồn chân lý của UI. Socket/FCM/sync chỉ ghi vào đây;
// component observe DB (useLiveQuery) nên tự cập nhật. Mở app thấy tin ngay, không chờ mạng.

export interface LocalMessage extends Message {
  status: MessageStatus; // pending | sent | delivered | read | failed
}

export interface OutboxItem {
  clientMsgId: string; // khóa chính
  conversationId: string;
  type: Message['type'];
  content: string;
  replyToId: string | null;
  createdAt: string;
  attempts: number;
  status: 'pending' | 'failed';
}

class MtmDb extends Dexie {
  messages!: Table<LocalMessage, string>;
  conversations!: Table<Conversation, string>;
  outbox!: Table<OutboxItem, string>;

  constructor() {
    super('mtm-chat');
    this.version(1).stores({
      // [conversationId+seq] để query 1 hội thoại theo thứ tự seq
      messages: 'id, [conversationId+seq], conversationId, clientMsgId',
      conversations: 'id, updatedAt',
      outbox: 'clientMsgId, conversationId, status',
    });
  }
}

export const db = new MtmDb();

/** last_seq client đang giữ cho 1 hội thoại (bỏ qua tin pending có seq giả). */
export async function lastSeqOf(conversationId: string): Promise<number> {
  const top = await db.messages
    .where('[conversationId+seq]')
    .between([conversationId, Dexie.minKey], [conversationId, PENDING_SEQ - 1], true, true)
    .last();
  return top?.seq ?? 0;
}

/** Bản đồ cursor cho /sync, tính từ local. */
export async function buildCursors(): Promise<Record<string, number>> {
  const convs = await db.conversations.toArray();
  const cursors: Record<string, number> = {};
  for (const c of convs) cursors[c.id] = await lastSeqOf(c.id);
  return cursors;
}

// Tin đang gửi (chưa có seq thật) gán seq giả rất lớn để luôn nằm cuối danh sách.
export const PENDING_SEQ = Number.MAX_SAFE_INTEGER;
