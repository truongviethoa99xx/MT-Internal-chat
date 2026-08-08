'use client';

import Link from 'next/link';
import { conversations, threadFor } from '@/lib/mock';

export function ChatThread({ id }: { id: string }) {
  const conv = conversations.find((c) => c.id === id) ?? conversations[0];
  const msgs = threadFor(id);
  return (
    <section className="chat">
      <div className="chat-h">
        <div className="l">
          <Link href="/" className="back">←</Link>
          <div className={`ava ${conv.avaKind}`}>{conv.avatar}</div>
          <div>
            <div className="name">
              {conv.name}
              {conv.type === 'department' && <span className="tag-1o">Đồng bộ 1Office</span>}
            </div>
            <div className="sub">{conv.memberCount ? `${conv.memberCount} thành viên` : 'Đang hoạt động'}</div>
          </div>
        </div>
        <a className="link" href="#">Tìm</a>
      </div>

      <div className="thread">
        {msgs.map((m, i) => {
          if (m.kind === 'sys') return <div key={i} className="sys">{m.text}</div>;
          if (m.kind === 'out') {
            return (
              <div key={i} className="row-out">
                <div className="bub out">{m.text}</div>
                <span className="stamp">{m.time} · Đã xem</span>
              </div>
            );
          }
          return (
            <div key={i} className="row-in">
              <div className="mini">{m.avatar}</div>
              <div>
                <div className="sender">{m.sender}</div>
                <div className="bub in">{m.text}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="composer">
        <input placeholder="Nhập tin nhắn... (@ để nhắc ai đó)" />
        <a className="link" href="#" style={{ whiteSpace: 'nowrap' }}>Đính kèm</a>
        <button className="send-btn">➤</button>
      </div>
    </section>
  );
}
