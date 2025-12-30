import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { addresses } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function BookingAddress() {
  const navigate = useNavigate();
  const { booking, setAddress } = useBooking();
  const [selectedAddressId, setSelectedAddressId] = useState(
    booking.address?.id || addresses.find((a) => a.isDefault)?.id || ''
  );

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    const address = addresses.find((a) => a.id === addressId);
    if (address) {
      setAddress(address);
    }
  };

  const handleContinue = () => {
    if (!selectedAddressId) return;
    navigate('/customer/booking/summary');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="flex items-center gap-4 h-14 px-4 max-w-lg mx-auto">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">Select Address</h1>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Saved Addresses */}
        <div className="space-y-3 mb-6">
          {addresses.map((address) => (
            <button
              key={address.id}
              onClick={() => handleAddressSelect(address.id)}
              className={cn(
                'w-full p-4 rounded-xl border text-left transition-all',
                selectedAddressId === address.id
                  ? 'border-primary bg-accent'
                  : 'border-border bg-card'
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'p-2 rounded-lg',
                    selectedAddressId === address.id ? 'bg-primary' : 'bg-muted'
                  )}
                >
                  <MapPin
                    className={cn(
                      'w-4 h-4',
                      selectedAddressId === address.id
                        ? 'text-primary-foreground'
                        : 'text-muted-foreground'
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{address.label}</span>
                    {address.isDefault && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {address.fullAddress}
                  </p>
                  {address.landmark && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Landmark: {address.landmark}
                    </p>
                  )}
                </div>
                {selectedAddressId === address.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Add New Address */}
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom max-w-lg mx-auto">
        <Button
          className="w-full"
          size="lg"
          disabled={!selectedAddressId}
          onClick={handleContinue}
        >
          Continue to Summary
        </Button>
      </div>
    </div>
  );
}
