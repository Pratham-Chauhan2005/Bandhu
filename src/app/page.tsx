
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search } from 'lucide-react';
import { recommendedBandhus, topFoods, categories, mustVisitAttractions } from '@/lib/data';
import BandhuCard from '@/components/BandhuCard';
import ContentCard from '@/components/ContentCard';
import Link from 'next/link';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import type { Attraction } from '@/ai/schemas';
import { useRouter } from 'next/navigation';
import EventCard from '@/components/EventCard';
import type { Event } from '@/ai/schemas';
import { getEventsByLocation } from './actions';
import { getDistance } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type EventWithDistance = Event & { distance?: number };

export default function Home() {
  const { isScrolled } = useScroll(60);
  const [userCoords, setUserCoords] = useState<{latitude: number, longitude: number} | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>(mustVisitAttractions);
  const [nearbyEvents, setNearbyEvents] = useState<EventWithDistance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingEvents, setLoadingEvents] = useState(true);
  const router = useRouter();


  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({ latitude, longitude });
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            const { city, state, country } = data.address;
            const userLocation = city ? `${city}, ${state || country}` : state ? `${state}, ${country}` : country || 'your area';
            
            const eventResults = await getEventsByLocation({ location: userLocation });
            const eventsWithDistance = eventResults.events.map(event => ({
              ...event,
              distance: getDistance(latitude, longitude, event.latitude, event.longitude)
            }));
            setNearbyEvents(eventsWithDistance.slice(0, 2)); // Show 2 events on homepage
          } catch (error) {
            console.error('Error fetching location or events:', error);
          } finally {
            setLoadingEvents(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          setLoadingEvents(false);
        }
      );
    } else {
      setLoadingEvents(false);
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className={cn(
        "sticky z-20 bg-background/95 backdrop-blur-sm px-4 pb-4 transition-all duration-200",
        isScrolled ? 'top-14' : 'top-20'
      )}>
        <form onSubmit={handleSearch}>
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search services, guides, food..."
              className={cn(
                "text-base pl-12 pr-4 rounded-full shadow-sm border-0 bg-gray-100 focus-visible:ring-primary/50 transition-all duration-200",
                isScrolled ? 'h-10' : 'h-12'
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
                <Button key={category.name} variant="outline" className="flex items-center gap-2 rounded-full bg-white flex-shrink-0" asChild>
                    <Link href={category.href}>
                        <category.icon className="h-4 w-4" />
                        <span className="font-medium">{category.name}</span>
                    </Link>
                </Button>
            ))}
          </div>
        </div>
      </div>

      <section className="pt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-foreground">Recommended for You</h2>
          <Button variant="ghost" asChild>
            <Link href="/explore">
              View all
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 mobile-lg:grid-cols-3 tablet:grid-cols-4 laptop:grid-cols-5 desktop:grid-cols-6 gap-4">
          {recommendedBandhus.slice(0, 6).map((bandhu) => (
            <BandhuCard key={bandhu.id} bandhu={bandhu} />
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4">Top Local Foods</h2>
        <div className="grid grid-cols-2 mobile-lg:grid-cols-3 tablet:grid-cols-4 gap-4">
          {topFoods.map((food) => (
            <div key={food.id} className="w-full flex-shrink-0">
              <ContentCard content={food} type="food" userCoords={userCoords} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Nearby Events</h2>
            <Button variant="ghost" asChild>
                <Link href="/events">
                    View all
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
            {loadingEvents ? (
                <>
                    <Card><CardContent className="p-4"><Skeleton className="h-20 w-full" /></CardContent></Card>
                    <Card><CardContent className="p-4"><Skeleton className="h-20 w-full" /></CardContent></Card>
                </>
            ) : nearbyEvents.length > 0 ? (
                nearbyEvents.map((event) => (
                  <Card key={event.id} className="shadow-md rounded-xl">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-primary">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <Button size="sm" asChild>
                            <Link href="/events">Details</Link>
                        </Button>
                      </CardContent>
                  </Card>
                ))
            ) : (
                <p className="text-muted-foreground text-sm">No events found nearby.</p>
            )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Must Visit Attractions</h2>
        <div className="grid grid-cols-2 mobile-lg:grid-cols-3 tablet:grid-cols-4 gap-4">
          {attractions.map((attraction) => (
            <div key={attraction.id} className="w-full flex-shrink-0">
              <ContentCard content={attraction} type="attraction" userCoords={userCoords} />
            </div>
          ))}
        </div>
      </section>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
