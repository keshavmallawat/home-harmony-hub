import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { UserRole } from '@/types';

interface MobileLayoutProps {
  role: UserRole;
}

export function MobileLayout({ role }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNav role={role} />
    </div>
  );
}
