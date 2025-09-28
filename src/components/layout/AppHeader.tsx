'use client';
import { Button } from '@/components/ui/button';
import { User, MapPin, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AppHeader() {
  const [location, setLocation] = useState('Detecting location...');
  const [isLoading, setIsLoading] = useState(true);

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
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2 text-muted-foreground font-semibold w-1/3">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        ) : (
          <MapPin className="h-5 w-5 text-primary" />
        )}
        <span className="truncate text-sm">{location}</span>
      </div>
      <div className="flex-1 text-center">
        <Link href="/" className="text-2xl font-bold text-primary font-headline">
          Bandhu
        </Link>
      </div>
      <div className="flex justify-end w-1/3">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
            <User className="h-5 w-5 text-primary" />
            <span className="sr-only">Profile</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
