import type {
  AckRequest,
  HistoryResponse,
  SendMessageRequest,
  SendMessageResponse,
  SyncRequest,
  SyncResponse,
} from '@mtm/shared';

const BASE = (import.meta.env.VITE_API_URL as string) ?? 'http://localhost:3000';

// TODO(auth): thay x-user-id bằng JWT 1Office.
export function currentUserId(): string {
  return localStorage.getItem('userId') ?? '';
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-user-id': currentUserId() },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  sendMessage: (req: SendMessageRequest) => post<SendMessageResponse>('/messages', req),
  sync: (req: SyncRequest) => post<SyncResponse>('/sync', req),
  ack: (req: AckRequest) => post<{ ok: true }>('/ack', req),
  history: async (conversationId: string, beforeSeq?: number, limit = 50): Promise<HistoryResponse> => {
    const q = new URLSearchParams();
    if (beforeSeq != null) q.set('beforeSeq', String(beforeSeq));
    q.set('limit', String(limit));
    const res = await fetch(`${BASE}/conversations/${conversationId}/messages?${q}`, {
      headers: { 'x-user-id': currentUserId() },
    });
    if (!res.ok) throw new Error(`history -> ${res.status}`);
    return res.json() as Promise<HistoryResponse>;
  },
};
