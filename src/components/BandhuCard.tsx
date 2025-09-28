import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import VerifiedBadge from './VerifiedBadge';

type Bandhu = {
  id: string;
  name: string;
  service: string;
  rate: number;
  rating: number;
  reviews: number;
  verified: boolean;
  image: string;
  imageHint: string;
};

type BandhuCardProps = {
  bandhu: Bandhu;
};

export default function BandhuCard({ bandhu }: BandhuCardProps) {
  return (
    <Link href={`/bandhus/${bandhu.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          <Image
            src={bandhu.image}
            alt={`Profile of ${bandhu.name}`}
            width={400}
            height={400}
            className="w-full h-56 object-cover"
            data-ai-hint={bandhu.imageHint}
          />
          {bandhu.verified && (
            <div className="absolute top-3 right-3">
              <VerifiedBadge />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
             <h3 className="text-xl font-bold text-white">{bandhu.name}</h3>
             <p className="text-sm text-primary-foreground/80">{bandhu.service}</p>
          </div>
        </div>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
            <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-1 font-bold text-primary">
                    <Star className="w-4 h-4 fill-primary" />
                    <span>{bandhu.rating.toFixed(1)}</span>
                    <span className="font-normal text-muted-foreground">({bandhu.reviews} reviews)</span>
                </div>
                <Badge variant="secondary" className="text-base">
                    ${bandhu.rate}/hr
                </Badge>
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
