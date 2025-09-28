import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

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
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
        <Image
          src={content.image}
          alt={content.title}
          width={600}
          height={400}
          className="w-full h-40 object-cover"
          data-ai-hint={content.imageHint}
        />
        <CardHeader>
          <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{content.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{content.description}</p>
        </CardHeader>
      </Card>
    </Link>
  );
}
