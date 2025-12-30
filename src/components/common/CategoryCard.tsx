import { ServiceCategory } from '@/types';

interface CategoryCardProps {
  category: ServiceCategory;
  onClick?: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:shadow-card transition-all duration-200 active:scale-95"
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
