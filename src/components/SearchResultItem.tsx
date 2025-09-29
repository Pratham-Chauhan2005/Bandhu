
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, UtensilsCrossed, CalendarDays, Landmark, Star, IndianRupee } from 'lucide-react';
import type { recommendedBandhus, topFoods } from '@/lib/data';
import type { Attraction, Event } from '@/ai/schemas';

type Item = 
    | (typeof recommendedBandhus)[0]
    | (typeof topFoods)[0] 
    | Event
    | Attraction;

type ItemType = 'bandhu' | 'food' | 'event' | 'attraction';

type SearchResultItemProps = {
  item: Item;
  type: ItemType;
};

const typeConfig = {
    bandhu: { icon: Users, path: '/bandhus/' },
    food: { icon: UtensilsCrossed, path: '#' },
    event: { icon: CalendarDays, path: '/events' },
    attraction: { icon: Landmark, path: '/attractions/' },
}

export default function SearchResultItem({ item, type }: SearchResultItemProps) {
  const { icon: Icon, path } = typeConfig[type];

  const getTitle = () => 'name' in item ? item.name : item.title;
  const getDescription = () => {
    if ('service' in item) return item.service;
    if ('description' in item) return item.description;
    return '';
  }
  const getImage = () => 'image' in item ? item.image : undefined;
  const getHref = () => `${path}${item.id}`;


  return (
    <Link href={getHref()} className="block">
        <Card className="transition-all duration-300 hover:shadow-md hover:border-primary/30">
        <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/50">
                {getImage() && <AvatarImage src={getImage()} alt={getTitle()} />}
                <AvatarFallback>
                    <Icon className="h-6 w-6 text-muted-foreground" />
                </AvatarFallback>
            </Avatar>

            <div className="flex-grow">
                <p className="font-bold text-lg text-foreground">{getTitle()}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{getDescription()}</p>
            </div>

            {type === 'bandhu' && 'rating' in item && (
                 <div className="flex flex-col items-end justify-center gap-1 text-right">
                    <div className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-5 h-5 fill-current" />
                        <span>{item.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">({item.reviews} reviews)</p>
                 </div>
            )}
             {type === 'food' && 'price' in item && (
                 <div className="flex items-center font-bold text-primary">
                    <IndianRupee className="w-4 h-4" />
                    <span>{item.price}</span>
                 </div>
            )}
        </CardContent>
        </Card>
    </Link>
  );
}
