import React, { forwardRef } from 'react';
import { Star, Clock } from 'lucide-react';
import { Service } from '@/types';
import { cn } from '@/lib/utils';

interface ServiceCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  service: Service;
  variant?: 'default' | 'compact';
}

export const ServiceCard = forwardRef<HTMLButtonElement, ServiceCardProps>(
  ({ service, variant = 'default', className, ...props }, ref) => {
    const isCompact = variant === 'compact';

    return (
      <button
        ref={ref}
        className={cn(
          'w-full bg-card rounded-xl shadow-card border border-border overflow-hidden transition-all duration-200 hover:shadow-elevated active:scale-[0.98] text-left',
          isCompact ? 'flex gap-3 p-3' : 'block',
          className
        )}
        {...props}
      >
        <img
          src={service.image}
          alt={service.name}
          className={cn(
            'object-cover',
            isCompact ? 'w-20 h-20 rounded-lg flex-shrink-0' : 'w-full h-36'
          )}
        />
        <div className={cn('flex flex-col', !isCompact && 'p-4')}>
          <h3 className={cn('font-semibold text-foreground', isCompact ? 'text-sm' : 'text-base')}>
            {service.name}
          </h3>
          
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-warning text-warning" />
              <span className="text-xs font-medium text-foreground">{service.rating}</span>
              <span className="text-xs text-muted-foreground">({service.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs">{service.duration} min</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-primary font-bold">₹{service.price}</span>
            {!isCompact && (
              <span className="text-xs text-muted-foreground">onwards</span>
            )}
          </div>
        </div>
      </button>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';
