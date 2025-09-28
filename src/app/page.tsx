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
    <div className="space-y-12">
      <section className="text-center mt-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
          Discover Your City with a Local Friend
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hire local guides, photographers, and artists. Find authentic food, events, and attractions.
        </p>
      </section>

      <div className="relative max-w-2xl mx-auto">
        <Input
          placeholder="Search guides, food, events…"
          className="h-14 text-lg pl-6 pr-16 rounded-full shadow-lg border-2 border-transparent focus-visible:ring-primary focus-visible:border-primary"
        />
        <Button size="icon" className="absolute right-2.5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Local Foods</h2>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4">
            {topFoods.map((food) => (
              <CarouselItem key={food.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                 <ContentCard content={food} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14 hidden sm:flex" />
          <CarouselNext className="mr-14 hidden sm:flex" />
        </Carousel>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Local Guides</h2>
         <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-4">
            {recommendedBandhus.map((bandhu) => (
              <CarouselItem key={bandhu.id} className="pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <BandhuCard bandhu={bandhu} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14 hidden sm:flex" />
          <CarouselNext className="mr-14 hidden sm:flex" />
        </Carousel>
      </section>
      
      <section>
        <Tabs defaultValue="attractions">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="attractions">Nearby Attractions</TabsTrigger>
            <TabsTrigger value="events">Local Events</TabsTrigger>
          </TabsList>
          <TabsContent value="attractions">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {mustVisitAttractions.map((attraction) => (
                <ContentCard key={attraction.id} content={attraction} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="events">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {nearbyEvents.map((event) => (
                <ContentCard key={event.id} content={event} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
