
'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Clock, IndianRupee, MapPin } from 'lucide-react';
import type { Attraction } from '@/ai/schemas';

export default function AttractionPage() {
  const params = useParams();
  const id = params.id as string;
  const [attraction, setAttraction] = useState<Attraction | null>(null);

  useEffect(() => {
    const storedAttractions = sessionStorage.getItem('attractions');
    if (storedAttractions) {
      const attractions: Attraction[] = JSON.parse(storedAttractions);
      const currentAttraction = attractions.find((att) => att.id === id);
      if (currentAttraction) {
        setAttraction(currentAttraction);
      } else {
        notFound();
      }
    }
  }, [id]);

  if (!attraction) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const { title, description, image, hours, price, latitude, longitude } = attraction;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {image && (
            <Image
              src={image}
              alt={title}
              width={1200}
              height={600}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6 space-y-4">
            <h1 className="text-4xl font-headline font-bold">{title}</h1>
            <p className="text-lg text-muted-foreground">{description}</p>
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 pt-4">
              {hours && (
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-muted-foreground">{hours}</p>
                  </div>
                </div>
              )}
              {price && (
                <div className="flex items-center gap-3">
                  <IndianRupee className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Price</p>
                    <p className="text-muted-foreground">{price}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-headline font-bold">Location</h2>
        </CardHeader>
        <CardContent>
            <div className="w-full h-[400px] rounded-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={mapSrc}
                    className="rounded-lg"
                ></iframe>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
