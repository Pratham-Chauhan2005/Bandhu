
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { homestays } from '@/lib/data';
import { Loader2, MapPin, Star } from 'lucide-react';
import { getDistance } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type Homestay = (typeof homestays)[0] & { distance?: number };

export default function HomestaysPage() {
  const [location, setLocation] = useState('Detecting location...');
  const [sortedHomestays, setSortedHomestays] = useState<Homestay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to prevent geolocation from hanging
    const locationTimeout = setTimeout(() => {
      if (isLoading) {
        setLocation('Could not determine location');
        setSortedHomestays(homestays); // Show default list
        setIsLoading(false);
      }
    }, 10000); // 10-second timeout

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(locationTimeout);
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const { city, state } = data.address;
            setLocation(city ? `${city}, ${state}` : 'Unknown Location');

            const homestaysWithDistance = homestays.map(stay => ({
              ...stay,
              distance: getDistance(latitude, longitude, stay.latitude, stay.longitude)
            }));

            homestaysWithDistance.sort((a, b) => a.distance - b.distance);
            setSortedHomestays(homestaysWithDistance);

          } catch (error) {
            console.error('Error processing location:', error);
            setLocation('Could not determine location');
            setSortedHomestays(homestays); // Fallback to default list
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          clearTimeout(locationTimeout);
          console.error('Geolocation error:', error);
          setLocation('Location access denied');
          setSortedHomestays(homestays); // Show default list if permission denied
          setIsLoading(false);
        }
      );
    } else {
      clearTimeout(locationTimeout);
      setLocation('Geolocation not available');
      setSortedHomestays(homestays); // Show default list if geolocation is not available
      setIsLoading(false);
    }

    return () => clearTimeout(locationTimeout);
  }, [isLoading]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <div className="flex justify-between">
                        <Skeleton className="h-5 w-1/4" />
                        <Skeleton className="h-5 w-1/4" />
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    return (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedHomestays.map((stay) => (
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
                {stay.distance !== undefined && (
                  <p className="text-sm font-semibold">{stay.distance.toFixed(1)} km away</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

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
      {renderContent()}
    </div>
  );
}
