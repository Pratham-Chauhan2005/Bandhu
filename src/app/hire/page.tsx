'use client';

import { useState } from 'react';
import { recommendedBandhus } from '@/lib/data';
import BandhuListItem from '@/components/BandhuListItem';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function HireBandhuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');

  const filteredBandhus = recommendedBandhus.filter((bandhu) => {
    const matchesSearch =
      bandhu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bandhu.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bandhu.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesService = serviceFilter === 'all' || bandhu.service.toLowerCase().replace(' ', '-') === serviceFilter;

    return matchesSearch && matchesService;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">Hire a Local Bandhu</h1>
        <p className="text-muted-foreground">Find the perfect local expert for your trip.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name, service, or skill..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select onValueChange={setServiceFilter} value={serviceFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="city-guide">City Guide</SelectItem>
            <SelectItem value="photographer">Photographer</SelectItem>
            <SelectItem value="local-artist">Local Artist</SelectItem>
            <SelectItem value="food-expert">Food Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredBandhus.map((bandhu) => (
          <BandhuListItem key={bandhu.id} bandhu={bandhu} />
        ))}
      </div>
    </div>
  );
}
