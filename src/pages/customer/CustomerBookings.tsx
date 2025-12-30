import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { BookingCard } from '@/components/common/BookingCard';
import { mockBookings } from '@/data/mockData';
import { cn } from '@/lib/utils';

type Tab = 'upcoming' | 'past';

export default function CustomerBookings() {
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');

  const upcomingBookings = mockBookings.filter(
    (b) => b.status !== 'completed' && b.status !== 'cancelled'
  );
  const pastBookings = mockBookings.filter(
    (b) => b.status === 'completed' || b.status === 'cancelled'
  );

  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="min-h-screen bg-background">
      <Header title="My Bookings" showLocation={false} />

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex gap-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={cn(
              'flex-1 py-2.5 rounded-md text-sm font-medium transition-all',
              activeTab === 'upcoming'
                ? 'bg-card shadow-card text-foreground'
                : 'text-muted-foreground'
            )}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={cn(
              'flex-1 py-2.5 rounded-md text-sm font-medium transition-all',
              activeTab === 'past'
                ? 'bg-card shadow-card text-foreground'
                : 'text-muted-foreground'
            )}
          >
            Past
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 py-4 space-y-3">
        {displayedBookings.length > 0 ? (
          displayedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="font-semibold text-foreground mb-2">
              No {activeTab} bookings
            </h3>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'upcoming'
                ? 'Book a service to see it here'
                : 'Your completed bookings will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
