import React, { createContext, useContext, useState } from 'react';
import { Service, AddOn, Address, TimeSlot } from '@/types';

interface BookingState {
  service: Service | null;
  addOns: AddOn[];
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  address: Address | null;
  paymentMethod: 'upi' | 'card' | 'wallet' | 'cod' | null;
}

interface BookingContextType {
  booking: BookingState;
  setService: (service: Service) => void;
  addAddOn: (addOn: AddOn) => void;
  removeAddOn: (addOnId: string) => void;
  setDate: (date: Date) => void;
  setSlot: (slot: TimeSlot) => void;
  setAddress: (address: Address) => void;
  setPaymentMethod: (method: 'upi' | 'card' | 'wallet' | 'cod') => void;
  getTotal: () => number;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  service: null,
  addOns: [],
  selectedDate: null,
  selectedSlot: null,
  address: null,
  paymentMethod: null,
};

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(initialState);

  const setService = (service: Service) => {
    setBooking((prev) => ({ ...prev, service, addOns: [] }));
  };

  const addAddOn = (addOn: AddOn) => {
    setBooking((prev) => ({
      ...prev,
      addOns: [...prev.addOns, addOn],
    }));
  };

  const removeAddOn = (addOnId: string) => {
    setBooking((prev) => ({
      ...prev,
      addOns: prev.addOns.filter((a) => a.id !== addOnId),
    }));
  };

  const setDate = (date: Date) => {
    setBooking((prev) => ({ ...prev, selectedDate: date, selectedSlot: null }));
  };

  const setSlot = (slot: TimeSlot) => {
    setBooking((prev) => ({ ...prev, selectedSlot: slot }));
  };

  const setAddress = (address: Address) => {
    setBooking((prev) => ({ ...prev, address }));
  };

  const setPaymentMethod = (method: 'upi' | 'card' | 'wallet' | 'cod') => {
    setBooking((prev) => ({ ...prev, paymentMethod: method }));
  };

  const getTotal = () => {
    const servicePrice = booking.service?.price || 0;
    const addOnsPrice = booking.addOns.reduce((sum, addOn) => sum + addOn.price, 0);
    return servicePrice + addOnsPrice;
  };

  const resetBooking = () => {
    setBooking(initialState);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setService,
        addAddOn,
        removeAddOn,
        setDate,
        setSlot,
        setAddress,
        setPaymentMethod,
        getTotal,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
