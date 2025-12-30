import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Booking, BookingStatus } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface BookingCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  booking: Booking;
  showActions?: boolean;
}

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning' },
  confirmed: { label: 'Confirmed', className: 'bg-primary/10 text-primary' },
  partner_assigned: { label: 'Partner Assigned', className: 'bg-primary/10 text-primary' },
  started: { label: 'In Progress', className: 'bg-accent text-accent-foreground' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success' },
  cancelled: { label: 'Cancelled', className: 'bg-destructive/10 text-destructive' },
};

export const BookingCard = forwardRef<HTMLButtonElement, BookingCardProps>(
  ({ booking, className, ...props }, ref) => {
    const navigate = useNavigate();
    const status = statusConfig[booking.status];

    return (
      <button
        ref={ref}
        onClick={() => navigate(`/customer/booking/${booking.id}`)}
        className={cn(
          'w-full bg-card rounded-xl shadow-card border border-border p-4 text-left transition-all duration-200 hover:shadow-elevated active:scale-[0.98]',
          className
        )}
        {...props}
      >
        <div className="flex gap-3">
          <img
            src={booking.service.image}
            alt={booking.service.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground truncate">{booking.service.name}</h3>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </div>

            <div className="flex items-center gap-2 mt-1.5">
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', status.className)}>
                {status.label}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{format(new Date(booking.scheduledDate), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{booking.scheduledTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{booking.address.fullAddress}</span>
        </div>
      </button>
    );
  }
);

BookingCard.displayName = 'BookingCard';
