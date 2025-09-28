
import { localFoodShops } from '@/lib/data';
import FoodShopListItem from '@/components/FoodShopListItem';
import { UtensilsCrossed } from 'lucide-react';

export default function FoodPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Famous Local Food Shops</h1>
        <p className="text-muted-foreground">Discover the best eats in town, recommended by locals.</p>
      </div>

      <div className="space-y-4">
        {localFoodShops.map((shop) => (
          <FoodShopListItem key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}
