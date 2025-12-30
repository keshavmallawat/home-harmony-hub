import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { timeSlots } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';

export default function BookingSchedule() {
  const navigate = useNavigate();
  const { booking, setDate, setSlot } = useBooking();
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));

  const handleDateSelect = (index: number) => {
    setSelectedDateIndex(index);
    setDate(dates[index]);
  };

  const handleSlotSelect = (slot: typeof timeSlots[0]) => {
    if (!slot.available) return;
    setSlot(slot);
  };

  const handleContinue = () => {
    if (!booking.selectedSlot) return;
    navigate('/customer/booking/address');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-4 h-14 px-4 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Select Date & Time</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Date Selection */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Select Date</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(index)}
                className={cn(
                  'flex flex-col items-center min-w-[4.5rem] p-3 rounded-xl border transition-all',
                  selectedDateIndex === index
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:border-primary/50'
                )}
              >
                <span className="text-xs font-medium opacity-80">
                  {format(date, 'EEE')}
                </span>
                <span className="text-xl font-bold">{format(date, 'd')}</span>
                <span className="text-xs opacity-80">{format(date, 'MMM')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Select Time Slot</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => handleSlotSelect(slot)}
                disabled={!slot.available}
                className={cn(
                  'p-3 rounded-xl border text-sm font-medium transition-all',
                  !slot.available && 'opacity-40 cursor-not-allowed bg-muted',
                  slot.available && booking.selectedSlot?.id === slot.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : slot.available
                    ? 'border-border bg-card hover:border-primary/50'
                    : ''
                )}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom max-w-lg mx-auto">
        <Button
          className="w-full"
          size="lg"
          disabled={!booking.selectedSlot}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
