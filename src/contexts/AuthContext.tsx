import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, User> = {
  customer: {
    id: '1',
    phone: '+91 98765 43210',
    name: 'Rahul Sharma',
    role: 'customer',
    isVerified: true,
    createdAt: new Date(),
  },
  partner: {
    id: '2',
    phone: '+91 98765 43211',
    name: 'Vikram Singh',
    role: 'partner',
    isVerified: true,
    createdAt: new Date(),
  },
  admin: {
    id: '3',
    phone: '+91 98765 43212',
    email: 'admin@serveease.com',
    name: 'Admin User',
    role: 'admin',
    isVerified: true,
    createdAt: new Date(),
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (phone: string, otp: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo, any OTP works and defaults to customer
    // In real app, this would validate OTP and return user data
    const defaultUser = mockUsers.customer;
    setUser({ ...defaultUser, phone });
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const setUserRole = useCallback((role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    } else {
      setUser({ ...mockUsers[role], role });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
