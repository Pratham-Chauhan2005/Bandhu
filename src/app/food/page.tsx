'use client';

import { useState, useEffect } from 'react';
import FoodShopListItem from '@/components/FoodShopListItem';
import { Loader2, MapPin } from 'lucide-react';
import { getDistance } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { FoodShop } from '@/ai/schemas';
import { getLocalFoodShops } from '@/app/actions';

type FoodShopWithDistance = FoodShop & { distance?: number };

export default function FoodPage() {
  const [location, setLocation] = useState('Detecting location...');
  const [sortedShops, setSortedShops] = useState<FoodShopWithDistance[]>([]);
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
            const { city, state, country } = data.address;
            const userLocation = city ? `${city}, ${state || country}` : state ? `${state}, ${country}` : country || 'your area';
            setLocation(userLocation);

            const foodShopResults = await getLocalFoodShops({ location: userLocation });
            
            const shopsWithDistance = foodShopResults.foodShops.map(shop => ({
              ...shop,
              distance: getDistance(latitude, longitude, shop.latitude, shop.longitude)
            }));
            
            shopsWithDistance.sort((a,b) => a.distance - b.distance);
            setSortedShops(shopsWithDistance);

          } catch (error) {
            console.error('Error fetching food shops:', error);
            setLocation('Could not determine location');
            setSortedShops([]);
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
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Famous Local Food</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground font-semibold">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <MapPin className="h-5 w-5 text-primary" />
          )}
          <span className="truncate">{location}</span>
        </div>
        <p className="text-muted-foreground mt-2">Discover the best eats in town, sorted by what's nearest to you.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="p-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-16 w-16 rounded-full" />
                        <div className="flex-grow space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className='space-y-2'>
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                </Card>
            ))
        ) : sortedShops.length > 0 ? (
          sortedShops.map((shop) => (
            <FoodShopListItem key={shop.id} shop={shop} />
          ))
        ) : (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No local food spots found at this time.</p>
                <p className="text-sm text-muted-foreground">Try checking back later or searching in a different area.</p>
            </div>
        )}
      </div>
    </div>
  );
}
