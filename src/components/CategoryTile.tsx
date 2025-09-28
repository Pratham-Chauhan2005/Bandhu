import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

type CategoryTileProps = {
  name: string;
  icon: LucideIcon;
  href: string;
};

export default function CategoryTile({ name, icon: Icon, href }: CategoryTileProps) {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-300 hover:bg-card/80 hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
        <CardContent className="flex flex-col items-center justify-center p-4 gap-2 aspect-square">
          <Icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
          <span className="font-semibold text-center text-sm text-foreground">{name}</span>
        </CardContent>
      </Card>
    </Link>
  );
}
