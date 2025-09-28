'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { MapPin, User, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className="flex items-center gap-2 font-headline font-bold text-lg text-primary">
          <Zap className="h-6 w-6" />
          <span>Bandhu Local</span>
        </Link>
      </div>

      <div className="flex w-full items-center justify-end gap-4">
        <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>New Delhi, India</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}
