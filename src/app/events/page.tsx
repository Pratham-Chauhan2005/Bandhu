
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import EventCard from '@/components/EventCard';
import { Loader2, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getDistance } from '@/lib/utils';
import type { Event } from '@/ai/schemas';
import { getEventsByLocation } from '@/app/actions';

type EventWithDistance = Event & { distance?: number };

const DEFAULT_LOCATION = 'Delhi, India';

export default function EventsPage() {
  const [location, setLocation] = useState('Detecting location...');
  const [sortedEvents, setSortedEvents] = useState<EventWithDistance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async (loc: string, userCoords?: { latitude: number; longitude: number }) => {
    setIsLoading(true);
    try {
      const eventResults = await getEventsByLocation({ location: loc });
      
      if (userCoords) {
        const eventsWithDistance = eventResults.events.map(event => ({
          ...event,
          distance: getDistance(userCoords.latitude, userCoords.longitude, event.latitude, event.longitude)
        }));
        eventsWithDistance.sort((a,b) => a.distance - b.distance);
        setSortedEvents(eventsWithDistance);
      } else {
        setSortedEvents(eventResults.events);
      }

    } catch (error) {
      console.error('Error fetching events:', error);
      setSortedEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

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
            fetchEvents(userLocation, { latitude, longitude });

          } catch (error) {
            console.error('Error processing location:', error);
            setLocation(`Fell back to ${DEFAULT_LOCATION}`);
            fetchEvents(DEFAULT_LOCATION);
          }
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          setLocation(`Location access denied. Showing events for ${DEFAULT_LOCATION}.`);
          fetchEvents(DEFAULT_LOCATION);
        }
      );
    } else {
      setLocation(`Geolocation not available. Showing events for ${DEFAULT_LOCATION}.`);
      fetchEvents(DEFAULT_LOCATION);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Events & Festivals</h1>
        <div className="flex items-center justify-center gap-2 text-muted-foreground font-semibold">
          {isLoading && sortedEvents.length === 0 ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <MapPin className="h-5 w-5 text-primary" />
          )}
          <span className="truncate">{location}</span>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        sortedEvents.length > 0 ? (
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
                {sortedEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        ) : (
            <div className="text-center py-10">
                <p className="text-muted-foreground">No local events found at this time.</p>
                <p className="text-sm text-muted-foreground">Try checking back later.</p>
            </div>
        )
      )}
    </div>
  );
}
