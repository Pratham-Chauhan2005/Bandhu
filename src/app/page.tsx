
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search } from 'lucide-react';
import { recommendedBandhus, topFoods, nearbyEvents, categories, mustVisitAttractions } from '@/lib/data';
import BandhuCard from '@/components/BandhuCard';
import ContentCard from '@/components/ContentCard';
import Link from 'next/link';
import { useScroll } from '@/hooks/use-scroll';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import type { Attraction } from '@/ai/schemas';

export default function Home() {
  const { isScrolled } = useScroll(60);
  const [userCoords, setUserCoords] = useState<{latitude: number, longitude: number} | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>(mustVisitAttractions);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({ latitude, longitude });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  return (
    <div className="space-y-8">
      <div className={cn(
        "sticky z-20 bg-background/95 backdrop-blur-sm px-4 pb-4 transition-all duration-200",
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
        <div className="overflow-x-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedBandhus.slice(0, 4).map((bandhu) => (
              <BandhuCard key={bandhu.id} bandhu={bandhu} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="overflow-x-hidden">
        <h2 className="text-xl font-bold mb-4">Top Local Foods</h2>
        <div className="overflow-x-auto pb-4 no-scrollbar">
          <div className="flex space-x-4">
            {topFoods.map((food) => (
              <div key={food.id} className="w-64 flex-shrink-0">
                <ContentCard content={food} type="food" userCoords={userCoords} />
              </div>
            ))}
          </div>
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

      <section className="overflow-x-hidden">
        <h2 className="text-xl font-bold mb-4">Must Visit Attractions</h2>
        <div className="overflow-x-auto pb-4 no-scrollbar">
          <div className="flex space-x-4">
            {attractions.map((attraction) => (
              <div key={attraction.id} className="w-64 flex-shrink-0">
                <ContentCard content={attraction} type="attraction" userCoords={userCoords} />
              </div>
            ))}
          </div>
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
