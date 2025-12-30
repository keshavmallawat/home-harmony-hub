import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { format } from 'date-fns';

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const { booking } = useBooking();
  if (!booking.service) {
    navigate('/customer');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Success Animation */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-success flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-success-foreground" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
          Booking Confirmed!
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Your service has been booked successfully
        </p>

        {/* Booking Summary Card */}
        <div className="w-full bg-card rounded-2xl border border-border p-5 mb-6">
          <div className="flex gap-4 mb-4 pb-4 border-b border-border">
            <img
              src={booking.service.image}
              alt={booking.service.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground">{booking.service.name}</h3>
              <p className="text-sm text-muted-foreground">{booking.service.duration} min</p>
              <p className="text-primary font-bold mt-1">₹{booking.service.price}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {booking.selectedDate && format(booking.selectedDate, 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{booking.selectedSlot?.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="truncate">{booking.address?.fullAddress}</span>
            </div>
          </div>
        </div>

        {/* What's Next */}
        <div className="w-full bg-accent rounded-xl p-4 mb-8">
          <h4 className="font-semibold text-foreground mb-2">What's next?</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              A service professional will be assigned shortly
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              You'll receive a notification once assigned
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              Track your booking status in My Bookings
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 safe-bottom bg-card border-t border-border">
        <Button
          className="w-full mb-3"
          variant="hero"
          size="lg"
          onClick={() => navigate('/customer/bookings')}
        >
          View My Bookings
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate('/customer')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
}
