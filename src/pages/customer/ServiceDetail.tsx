import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Check, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services, addOns } from '@/data/mockData';
import { useBooking } from '@/contexts/BookingContext';
import { useState } from 'react';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setService, addAddOn, removeAddOn, booking, getTotal } = useBooking();
  
  const service = services.find((s) => s.id === id);
  const serviceAddOns = addOns.filter((a) => a.serviceId === id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  if (!service) {
    return <div>Service not found</div>;
  }

  const handleAddOnToggle = (addOnId: string) => {
    const addOn = serviceAddOns.find((a) => a.id === addOnId);
    if (!addOn) return;

    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns((prev) => prev.filter((id) => id !== addOnId));
      removeAddOn(addOnId);
    } else {
      setSelectedAddOns((prev) => [...prev, addOnId]);
      addAddOn(addOn);
    }
  };

  const handleBookNow = () => {
    setService(service);
    navigate('/customer/booking/schedule');
  };

  const totalPrice = service.price + serviceAddOns
    .filter((a) => selectedAddOns.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-56 object-cover"
        />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 -mt-6 relative">
        <div className="bg-card rounded-t-3xl pt-6">
          <h1 className="text-xl font-bold text-foreground mb-2">{service.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-semibold">{service.rating}</span>
              <span className="text-sm text-muted-foreground">({service.reviewsCount} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{service.duration} min</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-6">{service.description}</p>

          {/* Inclusions */}
          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">What's Included</h3>
            <div className="space-y-2">
              {service.inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                    <Check className="w-3 h-3 text-success" />
                  </div>
                  <span className="text-sm text-foreground">{inclusion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          {serviceAddOns.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Add-on Services</h3>
              <div className="space-y-3">
                {serviceAddOns.map((addOn) => {
                  const isSelected = selectedAddOns.includes(addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      onClick={() => handleAddOnToggle(addOn.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-primary bg-accent'
                          : 'border-border bg-card'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {isSelected ? (
                            <Minus className="w-3 h-3" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">{addOn.name}</p>
                          <p className="text-xs text-muted-foreground">{addOn.duration} min</p>
                        </div>
                      </div>
                      <span className="font-semibold text-primary">+₹{addOn.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-bottom max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Total Price</p>
            <p className="text-xl font-bold text-foreground">₹{totalPrice}</p>
          </div>
          <Button size="lg" onClick={handleBookNow}>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
