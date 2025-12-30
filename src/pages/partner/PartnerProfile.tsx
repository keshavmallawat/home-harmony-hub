import { useNavigate } from 'react-router-dom';
import {
  User,
  FileText,
  Clock,
  Star,
  HelpCircle,
  Shield,
  LogOut,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { mockPartner } from '@/data/mockData';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: User, label: 'Edit Profile', path: '/partner/profile/edit' },
  { icon: FileText, label: 'My Documents', path: '/partner/documents' },
  { icon: Clock, label: 'Set Availability', path: '/partner/availability' },
  { icon: Star, label: 'My Reviews', path: '/partner/reviews' },
  { icon: HelpCircle, label: 'Help & Support', path: '/partner/support' },
  { icon: Shield, label: 'Privacy Policy', path: '/privacy' },
];

export default function PartnerProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="Profile" showLocation={false} showNotification={false} />

      <div className="px-4 py-6">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground truncate">
                  {user?.name || 'Partner'}
                </h2>
                {mockPartner.status === 'approved' && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user?.phone}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{mockPartner.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">{mockPartner.totalJobs}</p>
              <p className="text-xs text-muted-foreground">Jobs Done</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">2y</p>
              <p className="text-xs text-muted-foreground">Experience</p>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-success/10 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-success" />
          <div>
            <p className="font-medium text-foreground">Verified Partner</p>
            <p className="text-sm text-muted-foreground">
              All documents verified and approved
            </p>
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
      </div>
    </div>
  );
}
