'use client';

import Link from 'next/link';
import { useRole } from './RoleContext';

export function TopNav() {
  const { role, toggle } = useRole();
  return (
    <header className="topbar">
      <Link href="/" className="brand">‹ HRM · MTM<span>.</span> Chat</Link>
      <nav className="seg">
        <a className="active" href="#">Đoạn chat</a>
        <a href="#">Danh bạ</a>
        <a href="#">Cài đặt</a>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="role-c" onClick={toggle} title="Đổi vai trò (demo)">
          <span className={role === 'employee' ? 'on' : ''}>Nhân viên</span>
          <span className={role === 'admin' ? 'on' : ''}>Có quyền</span>
        </button>
        <div className="avatar">NA</div>
      </div>
    </header>
  );
}
