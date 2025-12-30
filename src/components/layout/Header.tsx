import { MapPin, Bell, ChevronDown } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
  showLocation?: boolean;
  showNotification?: boolean;
}

export function Header({ title, showLocation = true, showNotification = true }: HeaderProps) {
  const { location } = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border safe-top">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        {showLocation && location ? (
          <button className="flex items-center gap-2 text-left">
            <div className="p-2 rounded-full bg-accent">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Location</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-foreground">{location.city}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </button>
        ) : (
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
        )}

        {showNotification && (
          <Button variant="ghost" size="icon-sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
        )}
      </div>
    </header>
  );
}
