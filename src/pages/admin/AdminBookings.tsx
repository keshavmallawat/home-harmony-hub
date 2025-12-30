import { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { mockBookings } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

type StatusFilter = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning' },
  confirmed: { label: 'Confirmed', className: 'bg-primary/10 text-primary' },
  partner_assigned: { label: 'Assigned', className: 'bg-accent text-accent-foreground' },
  started: { label: 'In Progress', className: 'bg-primary/10 text-primary' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success' },
  cancelled: { label: 'Cancelled', className: 'bg-destructive/10 text-destructive' },
};

export default function AdminBookings() {
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = mockBookings.filter((booking) => {
    if (filter !== 'all' && booking.status !== filter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        booking.service.name.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header title="All Bookings" showLocation={false} />

      {/* Search & Filter */}
      <div className="px-4 py-4 sticky top-14 bg-background z-30 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-muted border-0"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as StatusFilter[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all capitalize',
                filter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 pb-6 space-y-3">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const status = statusConfig[booking.status];
            return (
              <div
                key={booking.id}
                className="bg-card rounded-xl border border-border p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{booking.service.name}</h4>
                      <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', status.className)}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Order #{booking.id}</p>
                  </div>
                  <span className="text-primary font-bold">₹{booking.totalAmount}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium">Rahul Sharma</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Partner</p>
                    <p className="font-medium">{booking.partnerId ? 'Vikram Singh' : 'Not Assigned'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3 border-t border-border">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(booking.scheduledDate), 'MMM d, yyyy')} at {booking.scheduledTime}
                  </span>
                </div>

                {!booking.partnerId && booking.status === 'confirmed' && (
                  <button className="w-full mt-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                    Assign Partner
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="font-semibold text-foreground mb-2">No bookings found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
