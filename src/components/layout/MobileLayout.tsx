import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { UserRole } from '@/types';

interface MobileLayoutProps {
  role: UserRole;
}

// Pages that should NOT show the bottom nav (they have their own bottom actions)
const pagesWithoutBottomNav = [
  '/booking/schedule',
  '/booking/address',
  '/booking/summary',
  '/service/',
  '/booking/',
  '/profile/edit',
  '/addresses',
  '/wallet',
  '/reviews',
  '/support',
  '/category/',
];

export function MobileLayout({ role }: MobileLayoutProps) {
  const location = useLocation();
  
  // Check if current path should hide the bottom nav
  const shouldHideBottomNav = pagesWithoutBottomNav.some(path => 
    location.pathname.includes(path)
  );

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <main className={shouldHideBottomNav ? '' : 'pb-20'}>
        <Outlet />
      </main>
      {!shouldHideBottomNav && <BottomNav role={role} />}
    </div>
  );
}
