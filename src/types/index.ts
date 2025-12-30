export type UserRole = 'customer' | 'partner' | 'admin';

export interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  servicesCount: number;
}

export interface Service {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  inclusions: string[];
  image: string;
  rating: number;
  reviewsCount: number;
}

export interface AddOn {
  id: string;
  serviceId: string;
  name: string;
  price: number;
  duration: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  fullAddress: string;
  city: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'partner_assigned' 
  | 'started' 
  | 'completed' 
  | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  partnerId?: string;
  serviceId: string;
  service: Service;
  addOns: AddOn[];
  address: Address;
  scheduledDate: Date;
  scheduledTime: string;
  status: BookingStatus;
  totalAmount: number;
  paymentMethod: 'upi' | 'card' | 'wallet' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed';
  rating?: number;
  review?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Partner {
  id: string;
  userId: string;
  user: User;
  categories: string[];
  documents: {
    id: string;
    type: 'id_proof' | 'certificate' | 'address_proof';
    url: string;
    status: 'pending' | 'approved' | 'rejected';
  }[];
  availability: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
  isAvailable: boolean;
  rating: number;
  totalJobs: number;
  totalEarnings: number;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
}

export interface Earning {
  id: string;
  partnerId: string;
  bookingId: string;
  amount: number;
  status: 'pending' | 'paid';
  paidAt?: Date;
  createdAt: Date;
}

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  partnerId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
