import React, { createContext, useContext, useState, useEffect } from 'react';

interface Location {
  city: string;
  pincode: string;
  fullAddress: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface LocationContextType {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  setLocation: (location: Location) => void;
  detectLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const defaultLocation: Location = {
  city: 'Bangalore',
  pincode: '560001',
  fullAddress: 'Bangalore, Karnataka',
};

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<Location | null>(defaultLocation);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setLocation = (newLocation: Location) => {
    setLocationState(newLocation);
    setError(null);
  };

  const detectLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if ('geolocation' in navigator) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });

        // In real app, reverse geocode coordinates
        // For demo, use mock data
        setLocationState({
          city: 'Bangalore',
          pincode: '560001',
          fullAddress: 'Koramangala, Bangalore',
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      } else {
        setError('Geolocation is not supported by your browser');
      }
    } catch (err) {
      setError('Unable to detect location. Please enter manually.');
      setLocationState(defaultLocation);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        isLoading,
        error,
        setLocation,
        detectLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
