'use client';

import { useState, useEffect } from 'react';
import { localFoodShops } from '@/lib/data';
import FoodShopListItem from '@/components/FoodShopListItem';
import { Loader2 } from 'lucide-react';
import { getDistance } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type FoodShop = (typeof localFoodShops)[0] & { distance?: number };

export default function FoodPage() {
  const [sortedShops, setSortedShops] = useState<FoodShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const shopsWithDistance = localFoodShops.map((shop) => ({
            ...shop,
            distance: getDistance(latitude, longitude, shop.latitude, shop.longitude),
          }));
          
          shopsWithDistance.sort((a, b) => a.distance - b.distance);
          setSortedShops(shopsWithDistance);
          setIsLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          // If location is denied, show the unsorted list
          setSortedShops(localFoodShops);
          setIsLoading(false);
        }
      );
    } else {
        // Geolocation not available
        setSortedShops(localFoodShops);
        setIsLoading(false);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Famous Local Food Shops in Gwalior</h1>
        <p className="text-muted-foreground">Discover the best eats in town, sorted by what's nearest to you.</p>
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
        ) : (
          sortedShops.map((shop) => (
            <FoodShopListItem key={shop.id} shop={shop} />
          ))
        )}
      </div>
    </div>
  );
}
