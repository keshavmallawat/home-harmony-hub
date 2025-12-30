import { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, User } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { mockBookings } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

type Tab = 'upcoming' | 'ongoing' | 'completed';

export default function PartnerJobs() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');

  const upcomingJobs = mockBookings.filter(
    (b) => b.status === 'confirmed' || b.status === 'partner_assigned'
  );
  const ongoingJobs = mockBookings.filter((b) => b.status === 'started');
  const completedJobs = mockBookings.filter((b) => b.status === 'completed');

  const getJobsByTab = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingJobs;
      case 'ongoing':
        return ongoingJobs;
      case 'completed':
        return completedJobs;
    }
  };

  const displayedJobs = getJobsByTab();

  return (
    <div className="min-h-screen bg-background">
      <Header title="My Jobs" showLocation={false} />

      {/* Tabs */}
      <div className="px-4 pt-4 sticky top-14 bg-background z-30">
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          {(['upcoming', 'ongoing', 'completed'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 py-2.5 rounded-md text-sm font-medium transition-all capitalize',
                activeTab === tab
                  ? 'bg-card shadow-card text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="px-4 py-4 space-y-3">
        {displayedJobs.length > 0 ? (
          displayedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{job.service.name}</h4>
                  <p className="text-sm text-muted-foreground">Order #{job.id}</p>
                </div>
                <span className="text-primary font-bold text-lg">₹{job.totalAmount}</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(job.scheduledDate), 'EEE, MMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{job.scheduledTime}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>{job.address.fullAddress}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Customer</p>
                  <p className="text-xs text-muted-foreground">Rahul Sharma</p>
                </div>
                <Button variant="outline" size="icon-sm">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>

              {/* Actions */}
              {activeTab === 'upcoming' && (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Get Directions
                  </Button>
                  <Button className="flex-1">
                    Start Job
                  </Button>
                </div>
              )}

              {activeTab === 'ongoing' && (
                <Button variant="success" className="w-full">
                  Mark as Completed
                </Button>
              )}

              {activeTab === 'completed' && job.rating && (
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg">
                  <span className="text-success font-medium">★ {job.rating}</span>
                  <span className="text-sm text-muted-foreground">from customer</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="font-semibold text-foreground mb-2">
              No {activeTab} jobs
            </h3>
            <p className="text-sm text-muted-foreground">
              Jobs will appear here when available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
