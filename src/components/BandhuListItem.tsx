import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import VerifiedBadge from './VerifiedBadge';
import { Star, Languages, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

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
  languages: string[];
  phone: string;
  isAvailable: boolean;
};

type BandhuListItemProps = {
  bandhu: Bandhu;
};

export default function BandhuListItem({ bandhu }: BandhuListItemProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/50">
          <AvatarImage src={bandhu.image} alt={bandhu.name} />
          <AvatarFallback>{bandhu.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 items-center gap-4">
            <div className="md:col-span-2">
                <div className="flex items-center gap-2">
                    <Link href={`/bandhus/${bandhu.id}`} className="font-bold text-lg text-foreground hover:underline">{bandhu.name}</Link>
                    {bandhu.verified && <VerifiedBadge />}
                </div>
                <p className="text-sm text-primary font-medium">{bandhu.service}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Languages className="h-4 w-4" />
                    <span>{bandhu.languages.join(', ')}</span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                    <Badge className={cn(
                        bandhu.isAvailable ? 'bg-green-500' : 'bg-red-500',
                        'text-white'
                    )}>
                        {bandhu.isAvailable ? 'Available' : 'Occupied'}
                    </Badge>
                    {bandhu.isAvailable && (
                        <Button asChild size="sm">
                            <a href={`tel:${bandhu.phone}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                Contact
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
