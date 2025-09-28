import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Search, Users, Camera, Palette, UtensilsCrossed, CalendarDays, Landmark } from 'lucide-react';
import { categories, recommendedBandhus, topFoods, nearbyEvents, mustVisitAttractions } from '@/lib/data';
import CategoryTile from '@/components/CategoryTile';
import BandhuCard from '@/components/BandhuCard';
import ContentCard from '@/components/ContentCard';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-4">
          Discover Your City with a Local Friend
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Hire local guides, photographers, and artists. Find authentic food, events, and attractions. Your adventure starts here.
        </p>
      </section>

      <div className="relative max-w-xl mx-auto">
        <Input
          placeholder="Search guides, food, events…"
          className="h-12 text-lg pl-4 pr-14 rounded-full shadow-lg"
        />
        <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-accent hover:bg-accent/90">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryTile key={category.name} {...category} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Recommended Bandhus</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedBandhus.map((bandhu) => (
            <BandhuCard key={bandhu.id} bandhu={bandhu} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Nearby Events</h2>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent>
            {nearbyEvents.map((event) => (
              <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                 <ContentCard content={event} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14" />
          <CarouselNext className="mr-14" />
        </Carousel>
      </section>

       <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Top Local Foods</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topFoods.map((food) => (
            <ContentCard key={food.id} content={food} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Must-Visit Attractions</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mustVisitAttractions.map((attraction) => (
            <ContentCard key={attraction.id} content={attraction} />
          ))}
        </div>
      </section>
    </div>
  );
}
