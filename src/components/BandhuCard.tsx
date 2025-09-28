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
      <div className="w-24 h-24 mx-auto">
        <Image
          src={bandhu.image}
          alt={`Profile of ${bandhu.name}`}
          width={96}
          height={96}
          className="w-full h-full object-cover rounded-lg shadow-md"
          data-ai-hint={bandhu.imageHint}
        />
      </div>
      <p className="mt-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{bandhu.name}</p>
    </Link>
  );
}
