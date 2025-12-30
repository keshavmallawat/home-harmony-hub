import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, CreditCard, Wallet, Smartphone, Banknote, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';

const paymentMethods = [
  { id: 'upi', label: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', label: 'Card', icon: CreditCard, description: 'Credit or Debit Card' },
  { id: 'wallet', label: 'Wallet', icon: Wallet, description: 'ServeEase Wallet' },
  { id: 'cod', label: 'Cash', icon: Banknote, description: 'Pay after service' },
] as const;

export default function BookingSummary() {
  const navigate = useNavigate();
  const { booking, setPaymentMethod, getTotal, resetBooking } = useBooking();
  const [selectedPayment, setSelectedPayment] = useState<typeof paymentMethods[number]['id'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!booking.service || !booking.selectedSlot || !booking.address) {
    navigate('/customer');
    return null;
  }

  const handlePaymentSelect = (id: typeof paymentMethods[number]['id']) => {
    setSelectedPayment(id);
    setPaymentMethod(id);
  };

  const handleConfirmBooking = async () => {
    if (!selectedPayment) return;
    
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    toast.success('Booking Confirmed!', {
      description: 'Your service has been booked successfully.',
    });
    
    resetBooking();
    navigate('/customer/bookings');
  };

  const total = getTotal();
  const tax = Math.round(total * 0.18);
  const grandTotal = total + tax;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-4 h-14 px-4 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Booking Summary</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Service Details */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Service Details</h3>
          <div className="flex gap-3">
            <img
              src={booking.service.image}
              alt={booking.service.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium text-foreground">{booking.service.name}</p>
              <p className="text-sm text-muted-foreground">{booking.service.duration} min</p>
              <p className="text-primary font-semibold mt-1">₹{booking.service.price}</p>
            </div>
          </div>
          
          {booking.addOns.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm font-medium text-muted-foreground mb-2">Add-ons</p>
              {booking.addOns.map((addOn) => (
                <div key={addOn.id} className="flex justify-between text-sm">
                  <span>{addOn.name}</span>
                  <span>₹{addOn.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Schedule & Address */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">
                {booking.selectedDate && format(booking.selectedDate, 'EEEE, MMMM d, yyyy')}
              </p>
              <p className="text-sm text-foreground">{booking.selectedSlot.time}</p>
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

        {/* Payment Method */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Payment Method</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => handlePaymentSelect(method.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl border transition-all',
                    selectedPayment === method.id
                      ? 'border-primary bg-accent'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div
                    className={cn(
                      'p-2 rounded-lg',
                      selectedPayment === method.id ? 'bg-primary' : 'bg-muted'
                    )}
                  >
                    <Icon
                      className={cn(
                        'w-4 h-4',
                        selectedPayment === method.id
                          ? 'text-primary-foreground'
                          : 'text-muted-foreground'
                      )}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{method.label}</p>
                    <p className="text-xs text-muted-foreground">{method.description}</p>
                  </div>
                  {selectedPayment === method.id && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-card rounded-xl border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">Price Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Total</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border font-semibold text-base">
              <span>Total Amount</span>
              <span className="text-primary">₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Payable</p>
            <p className="text-xl font-bold text-foreground">₹{grandTotal}</p>
          </div>
          <Button
            size="lg"
            variant="hero"
            disabled={!selectedPayment || isLoading}
            onClick={handleConfirmBooking}
          >
            {isLoading ? 'Confirming...' : 'Confirm Booking'}
          </Button>
        </div>
      </div>
    </div>
  );
}
