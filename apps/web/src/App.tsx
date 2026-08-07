import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './lib/db';
import { currentUserId } from './lib/api';
import { connectSocket } from './lib/socket';
import { runSync } from './lib/sync';
import { sendText, retry } from './lib/outbox';
import { useMessages } from './hooks/useMessages';

// UI demo tối giản — chứng minh vòng: optimistic -> REST -> DB -> socket -> UI.
// Layout thật (3 cột, phòng ban, đăng nhập 1Office) dựng sau theo mockup.
export function App() {
  const [userId, setUserId] = useState(currentUserId());
  const conversations = useLiveQuery(() => db.conversations.orderBy('updatedAt').reverse().toArray(), [], []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const messages = useMessages(activeId);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (!userId) return;
    connectSocket();
    void runSync();
    const onVisible = () => document.visibilityState === 'visible' && void runSync();
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [userId]);

  if (!userId) {
    return (
      <div style={s.center}>
        <div style={s.card}>
          <div style={s.logo}>MT</div>
          <h1 style={{ fontSize: 18, margin: '10px 0' }}>MTM Chat</h1>
          <p style={{ color: '#6B7280', fontSize: 13 }}>Dev login — nhập userId (TODO: 1Office SSO)</p>
          <DevLogin onLogin={(id) => { localStorage.setItem('userId', id); setUserId(id); }} />
        </div>
      </div>
    );
  }

  return (
    <div style={s.shell}>
      <aside style={s.sidebar}>
        <div style={s.side_h}>Hội thoại</div>
        {(conversations ?? []).map((c) => (
          <button key={c.id} onClick={() => setActiveId(c.id)}
            style={{ ...s.conv, ...(activeId === c.id ? s.convActive : null) }}>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name ?? c.id.slice(0, 8)}</div>
            <div style={{ fontSize: 12, color: '#6B7280' }}>{c.type} · seq {c.lastSeq}</div>
          </button>
        ))}
        {(conversations ?? []).length === 0 && (
          <p style={{ padding: 12, color: '#9CA3AF', fontSize: 12 }}>
            Chưa có hội thoại — seed dữ liệu ở API rồi /sync sẽ đổ về đây.
          </p>
        )}
      </aside>

      <main style={s.main}>
        {activeId ? (
          <>
            <div style={s.msgs}>
              {messages.map((m) => (
                <div key={m.id} style={{ ...s.bubble, ...(m.senderId === userId ? s.mine : s.theirs) }}>
                  <div>{m.deletedAt ? <i style={{ opacity: 0.6 }}>Đã thu hồi</i> : m.content}</div>
                  <div style={s.meta}>
                    seq {m.seq >= Number.MAX_SAFE_INTEGER ? '—' : m.seq} · {statusLabel(m.status)}
                    {m.status === 'failed' && (
                      <button style={s.retry} onClick={() => retry(m.clientMsgId)}>thử lại</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <form style={s.composer} onSubmit={(e) => { e.preventDefault(); if (draft.trim()) { sendText(activeId, draft.trim()); setDraft(''); } }}>
              <input style={s.input} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Nhập tin nhắn..." />
              <button style={s.send} type="submit">➤</button>
            </form>
          </>
        ) : (
          <div style={s.center}><p style={{ color: '#9CA3AF' }}>Chọn một hội thoại</p></div>
        )}
      </main>
    </div>
  );
}

function DevLogin({ onLogin }: { onLogin: (id: string) => void }) {
  const [v, setV] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (v.trim()) onLogin(v.trim()); }} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
      <input style={s.input} value={v} onChange={(e) => setV(e.target.value)} placeholder="userId" />
      <button style={s.send} type="submit">Vào</button>
    </form>
  );
}

function statusLabel(st: string) {
  return { pending: 'đang gửi', sent: 'đã gửi ✓', delivered: 'đã nhận', read: 'đã xem', failed: 'gửi lỗi' }[st] ?? st;
}

const INDIGO = '#4F46E5';
const s: Record<string, React.CSSProperties> = {
  center: { minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'system-ui', background: '#F5F6F8' },
  card: { background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, padding: 32, width: 320, textAlign: 'center' },
  logo: { width: 48, height: 48, borderRadius: 14, background: INDIGO, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, margin: '0 auto' },
  shell: { display: 'flex', height: '100vh', fontFamily: 'system-ui', background: '#F5F6F8' },
  sidebar: { width: 280, borderRight: '1px solid #E5E7EB', background: '#fff', overflowY: 'auto' },
  side_h: { padding: 16, fontWeight: 700 },
  conv: { display: 'block', width: '100%', textAlign: 'left', border: 'none', background: 'transparent', padding: '10px 16px', cursor: 'pointer' },
  convActive: { background: '#EEF2FF' },
  main: { flex: 1, display: 'flex', flexDirection: 'column' },
  msgs: { flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 8 },
  bubble: { maxWidth: '62%', padding: '8px 12px', borderRadius: 14, fontSize: 14 },
  mine: { alignSelf: 'flex-end', background: INDIGO, color: '#fff' },
  theirs: { alignSelf: 'flex-start', background: '#fff', border: '1px solid #E5E7EB' },
  meta: { fontSize: 10.5, opacity: 0.7, marginTop: 4 },
  retry: { marginLeft: 8, fontSize: 10.5, cursor: 'pointer' },
  composer: { display: 'flex', gap: 8, padding: 16, borderTop: '1px solid #E5E7EB', background: '#fff' },
  input: { flex: 1, border: '1px solid #E5E7EB', borderRadius: 999, padding: '10px 16px', fontSize: 14, fontFamily: 'inherit' },
  send: { background: INDIGO, color: '#fff', border: 'none', borderRadius: 999, padding: '10px 16px', cursor: 'pointer' },
};
