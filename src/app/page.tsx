'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, Loader2, Star, Users, Camera, Palette, UtensilsCrossed, CalendarDays, Landmark } from 'lucide-react';
import { recommendedBandhus, topFoods, nearbyEvents, mustVisitAttractions, categories } from '@/lib/data';
import BandhuCard from '@/components/BandhuCard';
import ContentCard from '@/components/ContentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
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
    <div className="space-y-8">
       <div className="flex items-center gap-2 text-foreground/80 font-semibold">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        ) : (
          <MapPin className="h-5 w-5 text-primary" />
        )}
        <span className="truncate">{location}</span>
      </div>

      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search services, guides, food..."
          className="h-12 text-base pl-10 pr-4 rounded-lg shadow-sm border focus-visible:ring-primary/50"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
            <Button key={category.name} variant="outline" className="flex items-center gap-2 rounded-lg" asChild>
                <Link href={category.href}>
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                </Link>
            </Button>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
        <div className="space-y-4">
            {recommendedBandhus.map((bandhu) => (
              <Card key={bandhu.id} className="overflow-hidden">
                <Link href={`/bandhus/${bandhu.id}`} className="block">
                  <CardContent className="p-4 flex items-center gap-4">
                      <Image 
                        src={bandhu.image}
                        alt={bandhu.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover"
                        data-ai-hint={bandhu.imageHint}
                      />
                      <div className="flex-grow">
                          <p className="font-semibold text-foreground">{bandhu.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-primary text-primary" />
                                <span>{bandhu.rating.toFixed(1)}</span>
                              </div>
                              <span>•</span>
                              <span>₹{bandhu.rate}/hr</span>
                          </div>
                      </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4">Top Local Foods</h2>
        <div className="grid grid-cols-2 gap-4">
            {topFoods.map((food) => (
              <Card key={food.id}>
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="font-medium text-center">{food.title}</p>
                  </CardContent>
              </Card>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Nearby Events</h2>
        <div className="grid grid-cols-2 gap-4">
            {nearbyEvents.map((event) => (
              <Card key={event.id} className="bg-green-100/50">
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="font-medium text-center">{event.title}</p>
                  </CardContent>
              </Card>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Must Visit Attractions</h2>
        <div className="grid grid-cols-2 gap-4">
            {mustVisitAttractions.map((attraction) => (
              <Card key={attraction.id} className="bg-blue-100/50">
                  <CardContent className="p-4 flex items-center justify-center">
                    <p className="font-medium text-center">{attraction.title}</p>
                  </CardContent>
              </Card>
            ))}
        </div>
      </section>
    </div>
  );
}
