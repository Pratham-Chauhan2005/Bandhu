'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { recommendedBandhus, topFoods, nearbyEvents, categories } from '@/lib/data';
import BandhuCard from '@/components/BandhuCard';
import ContentCard from '@/components/ContentCard';
import Link from 'next/link';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { getAttractionsByLocation } from '@/app/actions';
import type { Attraction } from '@/ai/schemas';


export default function Home() {
  const { isScrolled } = useScroll(60);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [location, setLocation] = useState<string | null>(null);
  const [userCoords, setUserCoords] = useState<{latitude: number, longitude: number} | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            setUserCoords({ latitude, longitude });
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village;
            if (city) {
              setLocation(city);
            }
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (location) {
      const fetchAttractions = async () => {
        const result = await getAttractionsByLocation({ location });
        const attractionsWithIds = result.attractions.map((att, index) => ({
          ...att,
          id: `${att.title.toLowerCase().replace(/\s/g, '-')}`,
          image: att.image || `https://picsum.photos/seed/attraction${index}/${600}/${400}`,
          imageHint: att.imageHint || att.title.toLowerCase().split(' ').slice(0,2).join(' '),
        }));
        setAttractions(attractionsWithIds);
        sessionStorage.setItem('attractions', JSON.stringify(attractionsWithIds));
      };
      fetchAttractions();
    }
  }, [location]);

  return (
    <div className="space-y-8">
      <div className={cn(
        "sticky z-10 bg-background/95 backdrop-blur-sm -mx-4 px-4 pb-4 transition-all duration-200",
        isScrolled ? 'top-14' : 'top-20'
      )}>
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search services, guides, food..."
            className={cn(
              "text-base pl-12 pr-4 rounded-full shadow-sm border-0 bg-gray-100 focus-visible:ring-primary/50 transition-all duration-200",
              isScrolled ? 'h-10' : 'h-12'
            )}
          />
        </div>

        <div className="flex overflow-x-auto space-x-2 mt-4 -mx-4 px-4 pb-2 no-scrollbar">
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


      <section>
        <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
        <div className="flex space-x-4 overflow-x-auto -mx-4 px-4 pb-4 no-scrollbar">
            {recommendedBandhus.map((bandhu) => (
              <div key={bandhu.id} className="w-40 flex-shrink-0">
                <BandhuCard bandhu={bandhu} />
              </div>
            ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4">Top Local Foods</h2>
        <div className="flex space-x-4 overflow-x-auto -mx-4 px-4 pb-4 no-scrollbar">
            {topFoods.map((food) => (
              <div key={food.id} className="w-64 flex-shrink-0">
                <ContentCard content={food} type="food" userCoords={userCoords} />
              </div>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Nearby Events</h2>
        <div className="grid grid-cols-1 gap-4">
            {nearbyEvents.map((event) => (
              <Card key={event.id} className="shadow-md rounded-xl">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-primary">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    <Button size="sm">Details</Button>
                  </CardContent>
              </Card>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Must Visit Attractions</h2>
        <div className="flex space-x-4 overflow-x-auto -mx-4 px-4 pb-4 no-scrollbar">
            {attractions.length > 0 ? attractions.map((attraction) => (
              <div key={attraction.id} className="w-64 flex-shrink-0">
                <ContentCard content={attraction} type="attraction" userCoords={userCoords} />
              </div>
            )) : <p>Loading attractions...</p>}
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
