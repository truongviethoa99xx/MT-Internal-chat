'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV: { group: string; items: [string, string, string, string?][] }[] = [
  { group: '', items: [['/', 'Tổng quan', '▤']] },
  { group: 'Nhân sự', items: [['/to-chuc', 'Tổ chức', '◱'], ['/nhan-vien', 'Nhân viên', '○'], ['/chuc-vu', 'Chức vụ', '◈']] },
  { group: 'Chấm công', items: [['/ca-lam-viec', 'Ca làm việc', '◐'], ['/phan-ca', 'Phân ca', '▦'], ['/cham-cong', 'Đối soát công', '✓'], ['/don-tu', 'Đơn từ', '▤', '9']] },
  { group: 'Lương', items: [['/luong', 'Bảng lương', '₫'], ['/cau-hinh', 'Cấu hình', '⚙']] },
  { group: 'Khác', items: [['/bao-cao', 'Báo cáo', '▤'], ['/chat', 'Chat nội bộ', '▬']] },
];

const ROLES = ['HR', 'QLCH', 'Nhân viên'];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [role, setRole] = useState('HR');
  const active = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  return (
    <div className="hrm-shell">
      <aside className="hrm-nav">
        <div className="hrm-brand"><div className="mk">MT</div><b>MTM<span>.</span>HRM</b></div>
        <div className="hrm-nav-scroll">
          {NAV.map((sec, i) => (
            <div key={i}>
              {sec.group ? <div className="hrm-nav-group">{sec.group}</div> : null}
              {sec.items.map(([href, label, ic, badge]) => (
                <Link key={href} href={href} className={`hrm-nav-item${active(href) ? ' active' : ''}`}>
                  <span className="ic">{ic}</span>{label}
                  {badge ? <span className="hrm-nav-badge">{badge}</span> : null}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </aside>
      <div className="hrm-main">
        <header className="hrm-top">
          <div className="role">
            {ROLES.map((r) => (
              <button key={r} className={role === r ? 'on' : ''} onClick={() => setRole(r)}>{r}</button>
            ))}
          </div>
          <div className="who">
            <Link href="/toi" style={{ fontSize: 12, color: 'var(--indigo)', fontWeight: 600 }}>Bản nhân viên ›</Link>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Nguyễn Văn An</span>
            <div className="avatar">NA</div>
          </div>
        </header>
        <main className="hrm-content">{children}</main>
      </div>
    </div>
  );
}
