import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Phone, User, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockBookings } from '@/data/mockData';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning' },
  confirmed: { label: 'Confirmed', className: 'bg-primary/10 text-primary' },
  partner_assigned: { label: 'Partner Assigned', className: 'bg-primary/10 text-primary' },
  started: { label: 'In Progress', className: 'bg-accent text-accent-foreground' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success' },
  cancelled: { label: 'Cancelled', className: 'bg-destructive/10 text-destructive' },
};

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const booking = mockBookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="font-semibold text-foreground mb-2">Booking not found</h3>
          <button onClick={() => navigate(-1)} className="text-primary font-medium">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const status = statusConfig[booking.status];

  const handleCancel = () => {
    toast.success('Booking cancelled successfully');
    navigate('/customer/bookings');
  };

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    toast.success('Thank you for your review!');
    setIsRatingOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-4 h-14 px-4 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Booking Details</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-4">
        {/* Status Card */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <span className={cn('text-sm font-medium px-3 py-1 rounded-full', status.className)}>
              {status.label}
            </span>
            <span className="text-sm text-muted-foreground">#{booking.id}</span>
          </div>
          
          <div className="flex gap-3">
            <img
              src={booking.service.image}
              alt={booking.service.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground">{booking.service.name}</h3>
              <p className="text-sm text-muted-foreground">{booking.service.duration} min</p>
              <p className="text-lg font-bold text-primary mt-1">₹{booking.totalAmount}</p>
            </div>
          </div>
        </div>

        {/* Schedule & Address */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">{format(new Date(booking.scheduledDate), 'EEEE, MMMM d, yyyy')}</p>
              <p className="text-sm text-foreground">{booking.scheduledTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Service Address</p>
              <p className="font-medium">{booking.address.label}</p>
              <p className="text-sm text-foreground">{booking.address.fullAddress}</p>
            </div>
          </div>
        </div>

        {/* Partner Info */}
        {booking.partnerId && (
          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-semibold text-foreground mb-3">Service Professional</h4>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Vikram Singh</p>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span>4.8</span>
                  <span className="text-muted-foreground">(156 jobs)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon-sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon-sm">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Payment Info */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h4 className="font-semibold text-foreground mb-3">Payment Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Amount</span>
              <span>₹{booking.service.price}</span>
            </div>
            {booking.addOns.length > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Add-ons</span>
                <span>₹{booking.addOns.reduce((sum, a) => sum + a.price, 0)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-border font-semibold">
              <span>Total Paid</span>
              <span className="text-primary">₹{booking.totalAmount}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
              <span className="px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                {booking.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
              </span>
              <span>via {booking.paymentMethod.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Rating (if completed and not rated) */}
        {booking.status === 'completed' && !booking.rating && (
          <div className="bg-accent rounded-xl p-4">
            <h4 className="font-semibold text-foreground mb-2">Rate your experience</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Help us improve by sharing your feedback
            </p>
            <Button variant="hero" className="w-full" onClick={() => setIsRatingOpen(true)}>
              <Star className="w-4 h-4 mr-2" />
              Rate & Review
            </Button>
          </div>
        )}

        {/* Existing Rating */}
        {booking.rating && (
          <div className="bg-card rounded-xl border border-border p-4">
            <h4 className="font-semibold text-foreground mb-2">Your Review</h4>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= booking.rating! ? 'fill-warning text-warning' : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            {booking.review && (
              <p className="text-sm text-muted-foreground italic">"{booking.review}"</p>
            )}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      {booking.status !== 'completed' && booking.status !== 'cancelled' && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom max-w-lg mx-auto">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 text-destructive" onClick={handleCancel}>
              Cancel Booking
            </Button>
            <Button className="flex-1">
              Get Help
            </Button>
          </div>
        </div>
      )}

      {/* Rating Dialog */}
      <Dialog open={isRatingOpen} onOpenChange={setIsRatingOpen}>
        <DialogContent className="max-w-[90%] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Rate your experience</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    className={cn(
                      'w-10 h-10 transition-all',
                      star <= rating
                        ? 'fill-warning text-warning scale-110'
                        : 'text-muted-foreground hover:text-warning'
                    )}
                  />
                </button>
              ))}
            </div>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience (optional)"
              className="min-h-24"
            />
            <Button className="w-full" onClick={handleSubmitReview}>
              Submit Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
