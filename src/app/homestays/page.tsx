'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { homestays } from '@/lib/data';
import { Loader2, MapPin, Star } from 'lucide-react';

export default function HomestaysPage() {
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Nearby Homestays</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground font-semibold">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <MapPin className="h-5 w-5 text-primary" />
          )}
          <span className="truncate">{location}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {homestays.map((stay) => (
          <Card key={stay.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={stay.image}
              alt={stay.name}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
              data-ai-hint={stay.imageHint}
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-foreground">{stay.name}</h3>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-5 h-5 fill-current" />
                  <span>{stay.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <p className="text-lg font-semibold text-primary">₹{stay.price}/night</p>
                <p className="text-sm">{stay.distance} km away</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
