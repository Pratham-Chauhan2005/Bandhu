import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Attraction } from '@/ai/schemas';
import { MapPin } from 'lucide-react';
import { getDistance } from '@/lib/utils';

type Content = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageHint: string;
} & Partial<Attraction>;

type ContentCardProps = {
  content: Content;
  type: 'food' | 'attraction';
  userCoords: { latitude: number; longitude: number } | null;
};

export default function ContentCard({ content, type, userCoords }: ContentCardProps) {
  const distance = userCoords && content.latitude && content.longitude
    ? getDistance(userCoords.latitude, userCoords.longitude, content.latitude, content.longitude)
    : null;

  const href = type === 'attraction' ? `/attractions/${content.id}` : '#';

  return (
    <Link href={href} className="group block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 rounded-xl">
        <div className='relative'>
          <Image
            src={content.image}
            alt={content.title}
            width={600}
            height={400}
            className="w-full h-32 object-cover"
            data-ai-hint={content.imageHint}
          />
        </div>
        <CardContent className="p-3">
          <p className="font-semibold text-sm truncate">{content.title}</p>
          <p className="text-xs text-muted-foreground truncate">{content.description}</p>
          {distance !== null && (
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{distance.toFixed(1)} km away</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
