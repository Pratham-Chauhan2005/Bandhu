
'use client';
import { Button } from '@/components/ui/button';
import { User, MapPin, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { SidebarTrigger, useSidebar } from '../ui/sidebar';
import Logo from '../Logo';

export default function AppHeader() {
  const [location, setLocation] = useState('Detecting location...');
  const [isLoading, setIsLoading] = useState(true);
  const { isScrolled } = useScroll(60);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const { city, state } = data.address;
            setLocation(city ? `${city}, ${state}` : 'Unknown Location');
          } catch (error) {
            console.error('Error fetching address:', error);
            setLocation('Could not determine location');
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocation('Location access denied');
          setIsLoading(false);
        }
      );
    } else {
      setLocation('Geolocation not available');
      setIsLoading(false);
    }
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-30 flex items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm transition-all duration-200 ease-out",
      isScrolled ? 'h-14' : 'h-20',
      'tablet:px-6'
    )}>
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div className='hidden tablet:flex items-center gap-2 text-muted-foreground font-semibold'>
            {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : (
            <MapPin className="h-5 w-5 text-primary" />
            )}
            <span className={cn(
            "truncate transition-all duration-200",
            isScrolled ? 'text-xs' : 'text-sm'
            )}>{location}</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center tablet:justify-start">
        <div className="flex items-center">
            <Link href="/" className={cn(
            "font-bold text-primary font-headline transition-all duration-200",
            isScrolled ? 'text-xl' : 'text-2xl'
            )}>
            <Logo />
            </Link>
        </div>
      </div>
    </header>
  );
}
