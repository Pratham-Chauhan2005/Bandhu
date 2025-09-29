
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import type { Event } from '@/ai/schemas';

type EventWithDistance = Event & {
  distance?: number;
};

type EventCardProps = {
  event: EventWithDistance;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <Image
          src={event.image || 'https://picsum.photos/seed/event-placeholder/600/400'}
          alt={event.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint={event.imageHint}
        />
         {event.distance !== undefined && (
          <div className="absolute top-2 right-2 bg-background/80 text-foreground text-xs font-semibold p-1.5 rounded-md flex items-center gap-1">
              <MapPin className="w-3 h-3 text-primary" />
              <span>{event.distance.toFixed(1)} km away</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
        <div className="flex justify-between items-end">
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{event.date}</span>
            </div>
            {event.time && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Clock className="h-4 w-4 text-primary" />
                <span>{event.time}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
