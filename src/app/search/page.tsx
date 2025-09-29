
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { recommendedBandhus, topFoods, mustVisitAttractions } from '@/lib/data';
import SearchResultItem from '@/components/SearchResultItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NotFound from '@/components/NotFound';
import { getEventsByLocation } from '@/app/actions';
import type { Event } from '@/ai/schemas';
import { Skeleton } from '@/components/ui/skeleton';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const [eventResults, setEventResults] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (query.includes('event') || query.includes('festival')) {
        setLoading(true);
        // A bit of a hack, we don't have a specific location from the query,
        // so we'll just search for events in a major city. A better approach
        // would be to extract location from the query.
        const results = await getEventsByLocation({ location: 'Delhi, India' });
        setEventResults(results.events);
        setLoading(false);
      } else {
        setEventResults([]);
        setLoading(false);
      }
    };
    fetchEvents();
  }, [query]);

  if (!query) {
    return <NotFound title="Enter a search query" message="Please enter something in the search bar to find what you're looking for." />;
  }
  
  const normalize = (str: string) => str.toLowerCase().replace(/s$/, '');
  const normalizedQuery = normalize(query);

  const bandhuResults = recommendedBandhus.filter(b => {
    const service = b.service.toLowerCase();
    
    // Handle "guides" -> "guide", etc.
    if ((normalizedQuery === 'guides' || normalizedQuery === 'guide') && service.includes('guide')) return true;
    if ((normalizedQuery === 'photographers' || normalizedQuery === 'photographer') && service.includes('photographer')) return true;
    if ((normalizedQuery === 'artists' || normalizedQuery === 'artist') && service.includes('artist')) return true;

    if (query.includes('food guide') || query.includes('food expert')) {
      return service.includes('food expert');
    }
    
    if (query === 'food') {
      return false; // Don't show food experts when searching just for "food"
    }

    return b.name.toLowerCase().includes(query) ||
      b.service.toLowerCase().includes(query) ||
      b.skills.some(skill => skill.toLowerCase().includes(query)) ||
      b.bio.toLowerCase().includes(query);
  });

  const foodResults = topFoods.filter(f => 
    f.title.toLowerCase().includes(query) ||
    f.description.toLowerCase().includes(query)
  );
  
  const attractionResults = mustVisitAttractions.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.description.toLowerCase().includes(query)
  );
  
  const allResults = [...bandhuResults, ...foodResults, ...eventResults, ...attractionResults];

  if (!loading && allResults.length === 0) {
    return <NotFound title="No Results Found" message={`Sorry, we couldn't find any results for "${query}". Try a different search term.`} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold font-headline">Search Results for "{query}"</h1>

      <div className="space-y-6">
        {bandhuResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Bandhus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bandhuResults.map(item => <SearchResultItem key={`bandhu-${item.id}`} item={item} type="bandhu" />)}
            </CardContent>
          </Card>
        )}
        
        {foodResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Food</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {foodResults.map(item => <SearchResultItem key={`food-${item.id}`} item={item} type="food" />)}
            </CardContent>
          </Card>
        )}
        
        {loading ? (
            <Card>
                <CardHeader>
                    <CardTitle>Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                </CardContent>
            </Card>
        ) : eventResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {eventResults.map(item => <SearchResultItem key={`event-${item.id}`} item={item} type="event" />)}
            </CardContent>
          </Card>
        )}

        {attractionResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Attractions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {attractionResults.map(item => <SearchResultItem key={`attraction-${item.id}`} item={item} type="attraction" />)}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPageContent />
        </Suspense>
    )
}
