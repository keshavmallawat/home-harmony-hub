import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Clock } from 'lucide-react';
import { serviceCategories, services } from '@/data/mockData';
import { ServiceCard } from '@/components/common/ServiceCard';

export default function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const category = serviceCategories.find((c) => c.id === id);
  const categoryServices = services.filter((s) => s.categoryId === id);

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="font-semibold text-foreground mb-2">Category not found</h3>
          <button onClick={() => navigate(-1)} className="text-primary font-medium">
            Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Image */}
      <div className="relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="text-4xl mb-2">{category.icon}</div>
          <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </div>

      {/* Services List */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">
            {categoryServices.length} Services Available
          </h2>
        </div>

        {categoryServices.length > 0 ? (
          <div className="space-y-3">
            {categoryServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                variant="compact"
                onClick={() => navigate(`/customer/service/${service.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="font-semibold text-foreground mb-2">No services yet</h3>
            <p className="text-sm text-muted-foreground">
              Services for this category will be added soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
