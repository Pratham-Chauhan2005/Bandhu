
'use client';

import { useParams } from 'next/navigation';
import { recommendedBandhus, topFoods, nearbyEvents, mustVisitAttractions, categories } from '@/lib/data';
import BandhuCard from '@/components/BandhuCard';
import ContentCard from '@/components/ContentCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const serviceToCategory: { [key: string]: string } = {
  'City Guide': 'guides',
  'Photographer': 'photographers',
  'Local Artist': 'artists',
  'Food Expert': 'guides'
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const category = categories.find(c => c.href.endsWith(slug));
  const categoryName = category ? category.name : 'Category';

  const renderContent = () => {
    switch (slug) {
      case 'guides':
      case 'photographers':
      case 'artists':
        const bandhus = recommendedBandhus.filter(b => serviceToCategory[b.service]?.toLowerCase() === slug);
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {bandhus.map(bandhu => (
              <BandhuCard key={bandhu.id} bandhu={bandhu} />
            ))}
          </div>
        );
      case 'food':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topFoods.map(food => (
              <Card key={food.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                    src={food.image}
                    alt={food.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={food.imageHint}
                />
                <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-foreground">{food.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{food.description}</p>
                    <p className="text-lg font-semibold text-primary">${food.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 'events':
        return (
            <div className="grid grid-cols-1 gap-4">
                {nearbyEvents.map((event) => (
                  <Card key={event.id} className="shadow-md rounded-xl">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-primary">{event.title}</p>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p className="text-sm text-muted-foreground mt-1">Date: {event.date}</p>
                        </div>
                        <Button size="sm">Details</Button>
                      </CardContent>
                  </Card>
                ))}
            </div>
        );
      case 'attractions':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mustVisitAttractions.map(attraction => (
              <div key={attraction.id} className="w-full flex-shrink-0">
                <ContentCard content={attraction} type="attraction" />
              </div>
            ))}
          </div>
        );
      default:
        return <p>No items found for this category.</p>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold font-headline">{categoryName}</h1>
      {renderContent()}
    </div>
  );
}
