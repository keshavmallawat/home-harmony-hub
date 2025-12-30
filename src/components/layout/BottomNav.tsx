import { NavLink } from 'react-router-dom';
import { Home, Calendar, User, Search, Briefcase, DollarSign, LayoutDashboard, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const customerNav: NavItem[] = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/customer' },
  { icon: <Search className="w-5 h-5" />, label: 'Services', path: '/customer/services' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Bookings', path: '/customer/bookings' },
  { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/customer/profile' },
];

const partnerNav: NavItem[] = [
  { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/partner' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Jobs', path: '/partner/jobs' },
  { icon: <DollarSign className="w-5 h-5" />, label: 'Earnings', path: '/partner/earnings' },
  { icon: <User className="w-5 h-5" />, label: 'Profile', path: '/partner/profile' },
];

const adminNav: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/admin' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Bookings', path: '/admin/bookings' },
  { icon: <Users className="w-5 h-5" />, label: 'Users', path: '/admin/users' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/admin/settings' },
];

interface BottomNavProps {
  role: UserRole;
}

export function BottomNav({ role }: BottomNavProps) {
  const navItems = role === 'customer' ? customerNav : role === 'partner' ? partnerNav : adminNav;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center w-full h-full gap-1 text-xs font-medium transition-colors duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={cn(
                    'p-1.5 rounded-lg transition-all duration-200',
                    isActive && 'bg-accent'
                  )}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
