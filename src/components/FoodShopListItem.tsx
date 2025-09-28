
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';

type FoodShop = {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  image: string;
  imageHint: string;
};

type FoodShopListItemProps = {
  shop: FoodShop;
};

export default function FoodShopListItem({ shop }: FoodShopListItemProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="h-16 w-16 border-2 border-primary/50">
          <AvatarImage src={shop.image} alt={shop.name} />
          <AvatarFallback>{shop.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-grow">
          <p className="font-bold text-lg text-foreground">{shop.name}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{shop.location}</span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-1 text-right">
          <div className="flex items-center gap-1 font-bold text-amber-500">
            <Star className="w-5 h-5 fill-current" />
            <span>{shop.rating.toFixed(1)}</span>
          </div>
          <p className="text-xs text-muted-foreground">({shop.reviews} reviews)</p>
        </div>
      </CardContent>
    </Card>
  );
}
