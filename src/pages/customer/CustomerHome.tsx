import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { CategoryCard } from '@/components/common/CategoryCard';
import { ServiceCard } from '@/components/common/ServiceCard';
import { Input } from '@/components/ui/input';
import { serviceCategories, services } from '@/data/mockData';

export default function CustomerHome() {
  const navigate = useNavigate();

  const popularServices = services.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for services..."
            className="pl-12 h-12 bg-muted border-0"
          />
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 mb-6">
        <div className="gradient-primary rounded-2xl p-5 text-primary-foreground relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-1">Get 20% OFF</h2>
            <p className="text-sm opacity-90 mb-3">On your first booking</p>
            <button className="flex items-center gap-1 text-sm font-semibold">
              Book Now <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary-foreground/10 rounded-full" />
          <div className="absolute right-8 bottom-8 w-16 h-16 bg-primary-foreground/10 rounded-full" />
        </div>
      </div>

      {/* Categories */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Categories</h2>
          <button 
            onClick={() => navigate('/customer/services')}
            className="text-sm text-primary font-medium"
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {serviceCategories.slice(0, 8).map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CategoryCard
                category={category}
                onClick={() => navigate(`/customer/category/${category.id}`)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Popular Services */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Popular Services</h2>
          <button 
            onClick={() => navigate('/customer/services')}
            className="text-sm text-primary font-medium"
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {popularServices.map((service, index) => (
            <div
              key={service.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <ServiceCard
                service={service}
                onClick={() => navigate(`/customer/service/${service.id}`)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="px-4 pb-6">
        <div className="bg-accent rounded-2xl p-5">
          <h3 className="font-bold text-foreground mb-3">Why choose ServeEase?</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-2xl mb-1">✓</div>
              <p className="text-xs text-muted-foreground">Verified Professionals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-xs text-muted-foreground">Top Rated Service</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🔒</div>
              <p className="text-xs text-muted-foreground">Secure Payments</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
