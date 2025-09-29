'use client';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { recommendedBandhus } from '@/lib/data';
import VerifiedBadge from '@/components/VerifiedBadge';
import { Badge } from '@/components/ui/badge';
import { Star, Languages, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { getTranslation } from '@/app/actions';

export default function BandhuProfilePage({ params }: { params: { id: string } }) {
  const [isPending, startTransition] = useTransition();
  const bandhu = recommendedBandhus.find((b) => b.id === params.id);
  const [translatedBio, setTranslatedBio] = useState('');

  if (!bandhu) {
    notFound();
  }
  
  const originalBio = bandhu.bio;

  const handleLanguageChange = (langCode: string) => {
    if (!langCode || langCode === 'en') {
        setTranslatedBio('');
        return;
    }
    startTransition(async () => {
        const translation = await getTranslation({
            textToTranslate: originalBio,
            targetLanguage: langCode,
        });
        setTranslatedBio(translation);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="overflow-hidden">
        <CardContent className="p-0 flex flex-wrap md:flex-nowrap md:gap-8">
          <div className="w-full md:w-1/3">
            <Image
              src={bandhu.image}
              alt={`Profile of ${bandhu.name}`}
              width={400}
              height={400}
              className="w-full h-auto object-cover md:rounded-lg"
              data-ai-hint={bandhu.imageHint}
            />
          </div>
          <div className="p-6 md:p-0 md:w-2/3 space-y-4 flex flex-col justify-center">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-headline font-bold">{bandhu.name}</h1>
              {bandhu.verified && <VerifiedBadge />}
            </div>
            <p className="text-lg text-primary">{bandhu.service}</p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1 font-bold text-primary">
                <Star className="w-5 h-5 fill-primary" />
                <span>{bandhu.rating.toFixed(1)}</span>
                <span className="font-normal text-muted-foreground">({bandhu.reviews} reviews)</span>
              </div>
              <span className="text-2xl font-bold text-foreground/90">₹{bandhu.rate}/hr</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {bandhu.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
            </div>
            <div className="flex flex-wrap gap-2">
                <span className="font-semibold">Languages:</span>
                {bandhu.languages.join(', ')}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-2xl font-headline font-bold">About {bandhu.name}</h2>
                <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-muted-foreground" />
                    <Select onValueChange={handleLanguageChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Translate Bio" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">English (Original)</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="mr">Marathi</SelectItem>
                            <SelectItem value="te">Telugu</SelectItem>
                            <SelectItem value="ml">Malayalam</SelectItem>
                            <SelectItem value="pa">Punjabi</SelectItem>
                            <SelectItem value="ta">Tamil</SelectItem>
                            <SelectItem value="as">Assamese</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="text-foreground/90 prose prose-invert max-w-none">
                {isPending ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Translating...</span>
                    </div>
                ) : (
                    <p>{translatedBio || originalBio}</p>
                )}
            </div>
        </CardContent>
      </Card>

      <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-headline font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {bandhu.photos.map((photo, index) => (
                    <Image
                        key={index}
                        src={photo}
                        alt={`Gallery image ${index + 1} from ${bandhu.name}`}
                        width={400}
                        height={300}
                        className="rounded-lg object-cover w-full aspect-video"
                    />
                ))}
            </div>
          </CardContent>
      </Card>
    </div>
  );
}
