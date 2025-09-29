
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { recommendedBandhus, topFoods, nearbyEvents, mustVisitAttractions } from '@/lib/data';
import SearchResultItem from '@/components/SearchResultItem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import NotFound from '@/components/NotFound';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return <NotFound title="Enter a search query" message="Please enter something in the search bar to find what you're looking for." />;
  }

  const bandhuResults = recommendedBandhus.filter(b => 
    b.name.toLowerCase().includes(query) ||
    b.service.toLowerCase().includes(query) ||
    b.skills.some(skill => skill.toLowerCase().includes(query)) ||
    b.bio.toLowerCase().includes(query)
  );

  const foodResults = topFoods.filter(f => 
    f.title.toLowerCase().includes(query) ||
    f.description.toLowerCase().includes(query)
  );

  const eventResults = nearbyEvents.filter(e =>
    e.title.toLowerCase().includes(query) ||
    e.description.toLowerCase().includes(query)
  );
  
  const attractionResults = mustVisitAttractions.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.description.toLowerCase().includes(query)
  );
  
  const allResults = [...bandhuResults, ...foodResults, ...eventResults, ...attractionResults];

  if (allResults.length === 0) {
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
        
        {eventResults.length > 0 && (
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
