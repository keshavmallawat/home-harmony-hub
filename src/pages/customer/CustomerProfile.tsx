import { useNavigate } from 'react-router-dom';
import {
  User,
  MapPin,
  Wallet,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: User, label: 'Edit Profile', path: '/customer/profile/edit' },
  { icon: MapPin, label: 'Saved Addresses', path: '/customer/addresses' },
  { icon: Wallet, label: 'Wallet & Payments', path: '/customer/wallet' },
  { icon: Star, label: 'My Reviews', path: '/customer/reviews' },
  { icon: HelpCircle, label: 'Help & Support', path: '/customer/support' },
  { icon: FileText, label: 'Terms & Conditions', path: '/terms' },
  { icon: Shield, label: 'Privacy Policy', path: '/privacy' },
];

export default function CustomerProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Profile" showLocation={false} showNotification={false} />

      {/* Profile Card */}
      <div className="px-4 py-6">
        <div className="bg-card rounded-2xl border border-border p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-foreground truncate">
                {user?.name || 'Guest User'}
              </h2>
              <p className="text-sm text-muted-foreground">{user?.phone}</p>
            </div>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 p-4 hover:bg-accent transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="p-2 rounded-lg bg-accent">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span className="flex-1 text-left font-medium text-foreground">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full mt-6 text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
}
