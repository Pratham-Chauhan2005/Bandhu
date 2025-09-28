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
    <Link href={`/bandhus/${bandhu.id}`} className="group block text-left">
      <Card className="overflow-hidden h-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 rounded-xl">
        <Image
          src={bandhu.image}
          alt={`Profile of ${bandhu.name}`}
          width={150}
          height={150}
          className="w-full h-40 object-cover"
          data-ai-hint={bandhu.imageHint}
        />
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
            <p className="text-sm font-bold text-foreground truncate pr-2">{bandhu.name}</p>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 flex-shrink-0">
                <Star className="w-3 h-3 fill-current" />
                <span>{bandhu.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            <span>₹{bandhu.rate}/hr</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
