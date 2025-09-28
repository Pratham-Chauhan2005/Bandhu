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
    <Link href={`/bandhus/${bandhu.id}`} className="group block text-center">
      <Card className="overflow-hidden h-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 rounded-xl">
        <Image
          src={bandhu.image}
          alt={`Profile of ${bandhu.name}`}
          width={150}
          height={150}
          className="w-full h-32 object-cover"
          data-ai-hint={bandhu.imageHint}
        />
        <CardContent className="p-3 text-left">
          <p className="text-sm font-semibold text-foreground truncate">{bandhu.name}</p>
          <div className="text-xs text-muted-foreground">
            <span>₹{bandhu.rate}/hr</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
