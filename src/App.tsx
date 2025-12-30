import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LocationProvider } from "@/contexts/LocationContext";
import { BookingProvider } from "@/contexts/BookingContext";
import { MobileLayout } from "@/components/layout/MobileLayout";

// Auth
import LoginPage from "@/pages/auth/LoginPage";

// Customer Pages
import CustomerHome from "@/pages/customer/CustomerHome";
import ServicesPage from "@/pages/customer/ServicesPage";
import ServiceDetail from "@/pages/customer/ServiceDetail";
import CategoryPage from "@/pages/customer/CategoryPage";
import BookingSchedule from "@/pages/customer/BookingSchedule";
import BookingAddress from "@/pages/customer/BookingAddress";
import BookingSummary from "@/pages/customer/BookingSummary";
import BookingDetail from "@/pages/customer/BookingDetail";
import CustomerBookings from "@/pages/customer/CustomerBookings";
import CustomerProfile from "@/pages/customer/CustomerProfile";
import EditProfile from "@/pages/customer/EditProfile";
import SavedAddresses from "@/pages/customer/SavedAddresses";
import WalletPage from "@/pages/customer/WalletPage";
import MyReviews from "@/pages/customer/MyReviews";
import SupportPage from "@/pages/customer/SupportPage";

// Partner Pages
import PartnerHome from "@/pages/partner/PartnerHome";
import PartnerJobs from "@/pages/partner/PartnerJobs";
import PartnerEarnings from "@/pages/partner/PartnerEarnings";
import PartnerProfile from "@/pages/partner/PartnerProfile";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminSettings from "@/pages/admin/AdminSettings";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Auth */}
      <Route 
        path="/" 
        element={
          isAuthenticated && user ? (
            <Navigate to={`/${user.role}`} replace />
          ) : (
            <LoginPage />
          )
        } 
      />

      {/* Customer Routes */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={['customer']}>
            <MobileLayout role="customer" />
          </ProtectedRoute>
        }
      >
        <Route index element={<CustomerHome />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="service/:id" element={<ServiceDetail />} />
        <Route path="category/:id" element={<CategoryPage />} />
        <Route path="booking/schedule" element={<BookingSchedule />} />
        <Route path="booking/address" element={<BookingAddress />} />
        <Route path="booking/summary" element={<BookingSummary />} />
        <Route path="booking/:id" element={<BookingDetail />} />
        <Route path="bookings" element={<CustomerBookings />} />
        <Route path="profile" element={<CustomerProfile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="addresses" element={<SavedAddresses />} />
        <Route path="wallet" element={<WalletPage />} />
        <Route path="reviews" element={<MyReviews />} />
        <Route path="support" element={<SupportPage />} />
      </Route>

      {/* Partner Routes */}
      <Route
        path="/partner"
        element={
          <ProtectedRoute allowedRoles={['partner']}>
            <MobileLayout role="partner" />
          </ProtectedRoute>
        }
      >
        <Route index element={<PartnerHome />} />
        <Route path="jobs" element={<PartnerJobs />} />
        <Route path="earnings" element={<PartnerEarnings />} />
        <Route path="profile" element={<PartnerProfile />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MobileLayout role="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LocationProvider>
          <BookingProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </BookingProvider>
        </LocationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
