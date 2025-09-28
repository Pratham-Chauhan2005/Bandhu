import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Clock } from 'lucide-react';

type Event = {
  id: string;
  title: string;
  image: string;
  imageHint: string;
  date: string;
  time?: string;
};

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative">
        <Image
          src={event.image}
          alt={event.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint={event.imageHint}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{event.date}</span>
            </div>
            {event.time && (
              <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
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
