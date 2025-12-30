import React, { forwardRef } from 'react';
import { ServiceCategory } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryCardProps extends React.HTMLAttributes<HTMLButtonElement> {
  category: ServiceCategory;
}

export const CategoryCard = forwardRef<HTMLButtonElement, CategoryCardProps>(
  ({ category, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:shadow-card transition-all duration-200 active:scale-95',
          className
        )}
        {...props}
      >
        <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-2xl">
          {category.icon}
        </div>
        <span className="text-xs font-medium text-foreground text-center leading-tight">
          {category.name}
        </span>
      </button>
    );
  }
);

CategoryCard.displayName = 'CategoryCard';
