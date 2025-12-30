import { Calendar, DollarSign, Star, Briefcase, TrendingUp, Clock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { mockPartner, mockBookings } from '@/data/mockData';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export default function PartnerHome() {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(mockPartner.isAvailable);

  const todayJobs = mockBookings.filter((b) => b.status === 'confirmed');
  const pendingJobs = mockBookings.filter((b) => b.status === 'pending');

  return (
    <div className="min-h-screen bg-background">
      <Header showLocation={false} />

      <div className="px-4 py-6">
        {/* Welcome Card */}
        <div className="gradient-primary rounded-2xl p-5 text-primary-foreground mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90">Good Morning,</p>
              <h2 className="text-xl font-bold">{user?.name || 'Partner'}</h2>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/20 rounded-full px-3 py-1.5">
              <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-success' : 'bg-destructive'}`} />
              <span className="text-sm font-medium">{isAvailable ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm opacity-90">Available for jobs</span>
            <Switch
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-accent">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Today's Jobs</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{todayJobs.length}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-accent">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Today's Earnings</span>
            </div>
            <p className="text-2xl font-bold text-foreground">₹2,450</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-accent">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Rating</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{mockPartner.rating}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-accent">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Jobs</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{mockPartner.totalJobs}</p>
          </div>
        </div>

        {/* Pending Jobs */}
        {pendingJobs.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-foreground mb-3">New Job Requests</h3>
            <div className="space-y-3">
              {pendingJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-card rounded-xl border border-border p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{job.service.name}</h4>
                      <p className="text-sm text-muted-foreground">{job.address.fullAddress}</p>
                    </div>
                    <span className="text-primary font-bold">₹{job.totalAmount}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Tomorrow</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{job.scheduledTime}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg bg-muted text-muted-foreground font-medium">
                      Decline
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium">
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Stats */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">This Week</h3>
          </div>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Jobs Done</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">₹18.5K</p>
              <p className="text-xs text-muted-foreground">Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">4.9</p>
              <p className="text-xs text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
