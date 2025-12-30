import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Database,
  CreditCard,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: Settings, label: 'General Settings', path: '/admin/settings/general' },
  { icon: Bell, label: 'Notifications', path: '/admin/settings/notifications' },
  { icon: CreditCard, label: 'Payment Settings', path: '/admin/settings/payments' },
  { icon: Database, label: 'Service Management', path: '/admin/settings/services' },
  { icon: Shield, label: 'Security', path: '/admin/settings/security' },
  { icon: HelpCircle, label: 'Help & Support', path: '/admin/support' },
  { icon: FileText, label: 'Documentation', path: '/admin/docs' },
];

export default function AdminSettings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Settings" showLocation={false} showNotification={false} />

      <div className="px-4 py-6">
        {/* Admin Info */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{user?.name || 'Admin'}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                Administrator
              </span>
            </div>
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

        {/* App Info */}
        <div className="mt-6 p-4 bg-muted rounded-xl">
          <h3 className="font-semibold text-foreground mb-2">ServeEase Admin</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Version: 1.0.0</p>
            <p>Last updated: Dec 30, 2024</p>
          </div>
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
      </div>
    </div>
  );
}
