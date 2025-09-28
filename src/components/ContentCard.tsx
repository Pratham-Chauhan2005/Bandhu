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
  type: 'food' | 'attraction';
};

export default function ContentCard({ content, type }: ContentCardProps) {
    return (
    <Link href="#" className="group block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 rounded-xl">
        <div className='relative'>
          <Image
            src={content.image}
            alt={content.title}
            width={600}
            height={400}
            className="w-full h-32 object-cover"
            data-ai-hint={content.imageHint}
          />
        </div>
        <CardContent className="p-3">
          <p className="font-semibold text-sm truncate">{content.title}</p>
          <p className="text-xs text-muted-foreground">{content.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
