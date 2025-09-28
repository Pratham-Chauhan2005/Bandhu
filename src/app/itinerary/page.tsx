'use client';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getItinerary } from '@/app/actions';
import { Loader2, Zap } from 'lucide-react';

const formSchema = z.object({
  interests: z.string().min(3, 'Please list at least one interest.'),
  location: z.string().min(2, 'Location is required.'),
  duration: z.string().min(1, 'Please select a duration.'),
  travelStyle: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: '',
      location: '',
      duration: '',
      travelStyle: 'balanced',
    },
  });

  const onSubmit = (values: FormValues) => {
    setItinerary('');
    startTransition(async () => {
      const result = await getItinerary(values);
      setItinerary(result);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">AI Itinerary Planner</h1>
        <p className="text-muted-foreground">Let our AI craft the perfect trip for you based on your interests.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Plan Your Trip</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="interests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Interests</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., history, street food, art" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., New Delhi, India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1 day">1 Day</SelectItem>
                          <SelectItem value="3 days">3 Days</SelectItem>
                          <SelectItem value="1 week">1 Week</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="travelStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Travel Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a travel style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="budget-friendly">Budget-Friendly</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="fast-paced">Fast-Paced</SelectItem>
                          <SelectItem value="relaxed">Relaxed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={isPending}>
                  {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                  Generate Itinerary
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Your Personalized Itinerary</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            {isPending && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="font-semibold">Crafting your adventure...</p>
                <p className="text-sm text-center">Our AI is exploring hidden gems and local favorites just for you.</p>
              </div>
            )}
            {!isPending && itinerary && (
              <div className="prose prose-sm md:prose-base prose-invert max-w-none h-full overflow-y-auto rounded-md bg-card p-4 border border-border">
                {itinerary.split('\n').map((line, index) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                        return <h3 key={index} className="font-bold text-primary">{line.replace(/\*\*/g, '')}</h3>;
                    }
                    if (line.startsWith('*')) {
                        return <h4 key={index} className="font-semibold mt-4">{line.replace(/\*/g, '')}</h4>
                    }
                    return <p key={index}>{line}</p>;
                })}
              </div>
            )}
            {!isPending && !itinerary && (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-center">
                <Zap className="h-10 w-10 mb-4" />
                <p className="font-semibold">Your adventure awaits!</p>
                <p className="text-sm">Fill out the form to get your personalized plan.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
