'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { nearbyEvents } from '@/lib/data';
import EventCard from '@/components/EventCard';
import { Loader2, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function EventsPage() {
  const [location, setLocation] = useState('Detecting location...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and location detection
    const timer = setTimeout(() => {
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
    }, 1000); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Events & Festivals</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground font-semibold">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <MapPin className="h-5 w-5 text-primary" />
          )}
          <span className="truncate">{location}</span>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-4" />
                    <div className="flex justify-end">
                        <Skeleton className="h-10 w-24" />
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
