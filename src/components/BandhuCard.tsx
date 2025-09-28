import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
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
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 border-0">
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
        </div>
        <CardContent className="p-3 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground truncate">{bandhu.name}</h3>
              <p className="text-sm text-muted-foreground">{bandhu.service}</p>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
                <div className="flex items-center gap-1 font-semibold text-foreground">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span>{bandhu.rating.toFixed(1)}</span>
                    <span className="font-normal text-muted-foreground">({bandhu.reviews})</span>
                </div>
                <div className="text-base font-bold text-foreground">
                    ${bandhu.rate}<span className="font-normal text-muted-foreground text-sm">/hr</span>
                </div>
            </div>
        </CardContent>
      </Card>
    </Link>
  );
}
