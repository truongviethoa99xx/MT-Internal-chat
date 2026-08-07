import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, PENDING_SEQ, type LocalMessage } from '../lib/db';

// UI observe IndexedDB. Sort theo seq -> đúng thứ tự dù socket giao lộn xộn.
// Tin pending (seq = PENDING_SEQ) tự dồn xuống cuối.
export function useMessages(conversationId: string | null): LocalMessage[] {
  return (
    useLiveQuery(async () => {
      if (!conversationId) return [];
      const rows = await db.messages
        .where('[conversationId+seq]')
        .between([conversationId, Dexie.minKey], [conversationId, Dexie.maxKey])
        .toArray();
      return rows.sort((a, b) => a.seq - b.seq || a.createdAt.localeCompare(b.createdAt));
    }, [conversationId], []) ?? []
  );
}

export function unreadCount(lastSeq: number, myLastReadSeq: number): number {
  // seq thật (bỏ pending)
  return lastSeq >= PENDING_SEQ ? 0 : Math.max(0, lastSeq - myLastReadSeq);
}
