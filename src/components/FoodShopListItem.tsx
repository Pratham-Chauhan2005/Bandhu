
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import Link from 'next/link';
import type { FoodShop } from '@/ai/schemas';

type FoodShopWithDistance = FoodShop & {
  distance?: number;
};

type FoodShopListItemProps = {
  shop: FoodShopWithDistance;
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
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{shop.description}</p>
        </div>

        <div className="flex flex-col items-end justify-center gap-1 text-right">
            {shop.distance !== undefined && (
                <div className="text-xs font-semibold text-primary rounded-full bg-primary/10 px-2 py-1">
                    {shop.distance.toFixed(1)} km away
                </div>
            )}
          {shop.rating && (
            <div className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-5 h-5 fill-current" />
                <span>{shop.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
