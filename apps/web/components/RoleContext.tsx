'use client';

import { createContext, useContext, useState } from 'react';

type Role = 'employee' | 'admin';
interface RoleCtx { role: Role; toggle: () => void; }

const Ctx = createContext<RoleCtx>({ role: 'admin', toggle: () => {} });

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('admin');
  const toggle = () => setRole((r) => (r === 'admin' ? 'employee' : 'admin'));
  return <Ctx.Provider value={{ role, toggle }}>{children}</Ctx.Provider>;
}

export const useRole = () => useContext(Ctx);
