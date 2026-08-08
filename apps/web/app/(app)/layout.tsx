'use client';

import { usePathname } from 'next/navigation';
import { RoleProvider } from '@/components/RoleContext';
import { TopNav } from '@/components/TopNav';
import { Sidebar } from '@/components/Sidebar';
import { GroupPanel } from '@/components/GroupPanel';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const inChat = pathname.startsWith('/c/');
  return (
    <RoleProvider>
      <div className="layout" data-view={inChat ? 'chat' : 'list'}>
        <TopNav />
        <div className="body">
          <Sidebar />
          {children}
          <GroupPanel />
        </div>
      </div>
    </RoleProvider>
  );
}
