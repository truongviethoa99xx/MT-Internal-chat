'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS: [string, string][] = [
  ['/toi', 'Trang chủ'], ['/toi/ca', 'Ca của tôi'], ['/toi/cham-cong', 'Chấm công'],
  ['/toi/don', 'Đơn từ'], ['/toi/luong', 'Phiếu lương'], ['/chat', 'Chat'],
];

export default function EssLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
      <header style={{ background: '#fff', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#6366F1,#4F46E5)', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 12 }}>MT</div>
            <b style={{ fontSize: 15 }}>MTM · Nhân viên</b>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/" style={{ fontSize: 12, color: 'var(--muted)' }}>Bản quản trị ›</Link>
            <div className="avatar">TB</div>
          </div>
        </div>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 12px', display: 'flex', gap: 2, overflowX: 'auto' }}>
          {TABS.map(([href, label]) => {
            const on = href === '/toi' ? path === '/toi' : path.startsWith(href);
            return (
              <Link key={href} href={href} style={{ padding: '12px 14px', fontSize: 13.5, fontWeight: 600, color: on ? 'var(--indigo)' : 'var(--muted)', borderBottom: on ? '2px solid var(--indigo)' : '2px solid transparent', whiteSpace: 'nowrap' }}>{label}</Link>
            );
          })}
        </div>
      </header>
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px 60px' }}>{children}</main>
    </div>
  );
}
