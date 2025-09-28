'use client';
import { Button } from '@/components/ui/button';
import { MapPin, User, ChevronDown, Loader2 } from 'lucide-react';
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
            const { suburb, city, town, village, state } = data.address;
            const locationString = [suburb, city, town, village].filter(Boolean).join(', ');
            setLocation(`${locationString}, ${state}`);
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
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
      <div className="flex w-full items-center justify-between">
        <Button variant="ghost" className="flex items-center gap-1 text-foreground" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <MapPin className="h-5 w-5 text-primary" />
          )}
          <span className="font-bold truncate">{location}</span>
          {!isLoading && <ChevronDown className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-secondary">
          <User className="h-5 w-5 text-primary" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}
