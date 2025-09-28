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
  if (type === 'food') {
    return (
       <Link href="#" className="group block text-center">
        <div className="w-20 h-20 mx-auto">
          <Image
            src={content.image}
            alt={content.title}
            width={80}
            height={80}
            className="w-full h-full object-cover rounded-lg shadow-md"
            data-ai-hint={content.imageHint}
          />
        </div>
        <p className="mt-2 text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{content.title}</p>
      </Link>
    );
  }

  return (
    <Link href="#" className="group block h-full">
      <Card className="overflow-hidden h-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 rounded-xl">
        <div className='relative'>
          <Image
            src={content.image}
            alt={content.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint={content.imageHint}
          />
          <div className='absolute bottom-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded-md'>
            Gwalior Fort, 2.6 Km
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">{content.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
