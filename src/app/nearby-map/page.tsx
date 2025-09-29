
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { homestays } from '@/lib/data';
import { getLocalFoodShops, getEventsByLocation } from '@/app/actions';
import type { FoodShop } from '@/ai/schemas';
import type { Event } from '@/ai/schemas';

// Dynamically import the map component to avoid SSR issues with Leaflet
const NearbyMap = dynamic(() => import('@/components/NearbyMap'), {
  ssr: false,
  loading: () => <MapLoadingSkeleton />,
});

const MapLoadingSkeleton = () => (
  <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
    <div className="text-center text-muted-foreground">
      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
      <p>Loading Map...</p>
    </div>
  </div>
);

export type MapItem = {
  id: string;
  type: 'homestay' | 'food' | 'event';
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  image?: string;
  imageHint?: string;
};

export default function NearbyMapPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [mapItems, setMapItems] = useState<MapItem[]>([]);
  const [status, setStatus] = useState('loading-location'); // loading-location, loading-data, ready, error

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setStatus('loading-data');

          try {
            // Fetch location name for AI queries
            const geoResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const geoData = await geoResponse.json();
            const { city, state, country } = geoData.address;
            const locationString = city ? `${city}, ${state || country}` : state ? `${state}, ${country}` : country || 'your area';

            // Fetch all data in parallel
            const [foodResults, eventResults] = await Promise.all([
              getLocalFoodShops({ location: locationString }),
              getEventsByLocation({ location: locationString }),
            ]);

            const homestayItems: MapItem[] = homestays.map(stay => ({
              id: `homestay-${stay.id}`,
              type: 'homestay',
              latitude: stay.latitude,
              longitude: stay.longitude,
              name: stay.name,
              description: `₹${stay.price}/night - ${stay.rating} ★`,
              image: stay.image,
              imageHint: stay.imageHint,
            }));

            const foodItems: MapItem[] = foodResults.foodShops.map((shop: FoodShop) => ({
              id: `food-${shop.id}`,
              type: 'food',
              latitude: shop.latitude,
              longitude: shop.longitude,
              name: shop.name,
              description: shop.description,
              image: shop.image,
              imageHint: shop.imageHint,
            }));

            const eventItems: MapItem[] = eventResults.events.map((event: Event) => ({
              id: `event-${event.id}`,
              type: 'event',
              latitude: event.latitude,
              longitude: event.longitude,
              name: event.title,
              description: `${event.date} - ${event.description}`,
              image: event.image,
              imageHint: event.imageHint,
            }));
            
            setMapItems([...homestayItems, ...foodItems, ...eventItems]);
            setStatus('ready');
          } catch (error) {
            console.error('Error fetching data for map:', error);
            setStatus('error');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setStatus('error');
        }
      );
    } else {
      setStatus('error');
    }
  }, []);

  const renderContent = () => {
    if (status === 'loading-location' || status === 'loading-data') {
      return <MapLoadingSkeleton />;
    }
    if (status === 'error' || !userLocation) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg text-destructive">
          Could not load map. Please enable location services and try again.
        </div>
      );
    }
    return (
      <NearbyMap
        center={userLocation}
        items={mapItems}
      />
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">What's Nearby?</h1>
        <p className="text-muted-foreground">Explore homestays, food, and events around you.</p>
      </div>
      <div className="w-full h-[70vh] rounded-lg border shadow-md">
        {renderContent()}
      </div>
    </div>
  );
}
