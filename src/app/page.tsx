'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Search } from 'lucide-react';
import { recommendedBandhus, topFoods, nearbyEvents, mustVisitAttractions } from '@/lib/data';
import BandhuCard from '@/components/BandhuCard';
import ContentCard from '@/components/ContentCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="relative max-w-2xl mx-auto mt-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for local food, guide, places..."
          className="h-14 text-lg pl-12 pr-4 rounded-xl shadow-sm border-2 border-border focus-visible:ring-primary focus-visible:border-primary"
        />
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4 inline-block px-4 py-1 bg-primary/20 text-primary rounded-md">Local Foods</h2>
        <Carousel opts={{ align: "start" }} className="w-full mt-2">
          <CarouselContent className="-ml-4">
            {topFoods.map((food) => (
              <CarouselItem key={food.id} className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6">
                 <ContentCard content={food} type="food" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section>
         <h2 className="text-xl font-bold mb-4 inline-block px-4 py-1 bg-primary/20 text-primary rounded-md">Local Guides</h2>
         <Carousel opts={{ align: "start" }} className="w-full mt-2">
          <CarouselContent className="-ml-4">
            {recommendedBandhus.map((bandhu) => (
              <CarouselItem key={bandhu.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <BandhuCard bandhu={bandhu} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      
      <section>
        <Tabs defaultValue="attractions">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-transparent p-0">
            <TabsTrigger value="attractions" className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:rounded-lg rounded-lg">Nearby Attractions</TabsTrigger>
            <TabsTrigger value="events" className="text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:rounded-lg rounded-lg">Local Events Today!</TabsTrigger>
          </TabsList>
          <TabsContent value="attractions">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {mustVisitAttractions.map((attraction) => (
                <ContentCard key={attraction.id} content={attraction} type="attraction" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="events">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {nearbyEvents.map((event) => (
                <ContentCard key={event.id} content={event} type="attraction" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
