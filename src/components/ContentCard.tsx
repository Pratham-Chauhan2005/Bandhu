import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

type Content = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageHint: string;
};

type ContentCardProps = {
  content: Content;
};

export default function ContentCard({ content }: ContentCardProps) {
  return (
    <Link href="#" className="group block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 border-0">
        <Image
          src={content.image}
          alt={content.title}
          width={600}
          height={400}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <CardContent className="p-3">
          <h3 className="text-md font-bold group-hover:text-primary transition-colors truncate">{content.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{content.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
