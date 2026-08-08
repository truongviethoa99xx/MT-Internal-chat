'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from './RoleContext';
import { conversations, SECTIONS } from '@/lib/mock';

export function Sidebar() {
  const pathname = usePathname();
  const { role } = useRole();
  return (
    <aside className="sidebar">
      <div className="sidebar-h">
        <div className="row">
          <h2>Hội thoại</h2>
          {role === 'admin' && <button className="btn-new">+ Tạo nhóm</button>}
        </div>
        <input className="search" placeholder="Tìm kiếm hội thoại..." />
      </div>
      <div className="conv-list">
        {SECTIONS.map((sec) => {
          const items = conversations.filter((c) => c.section === sec);
          if (!items.length) return null;
          return (
            <div key={sec}>
              <div className="sec-label">{sec}</div>
              {items.map((c) => {
                const active = pathname === `/c/${c.id}`;
                return (
                  <Link
                    key={c.id}
                    href={`/c/${c.id}`}
                    className={`conv${active ? ' active' : ''}${c.archived ? ' muted' : ''}`}
                  >
                    <div className={`ava ${c.avaKind}${c.round ? ' round' : ''}`}>
                      {c.avatar}
                      {c.presence && <span className="dot" />}
                    </div>
                    <div className="body2">
                      <div className="top">
                        <span className="name">{c.name}</span>
                        <span className="time">{c.time}</span>
                      </div>
                      <div className="top">
                        <span className="prev">{c.preview}</span>
                        {c.unread ? (
                          <span className="badge">{c.unread}</span>
                        ) : c.archived ? (
                          <span className="pill-sm">Lưu trữ</span>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
