'use client';
import { Button } from '@/components/ui/button';
import { User, Sun, Moon } from 'lucide-react';
import Link from 'next/link';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-6">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary font-headline">
          Bandhu
        </Link>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-secondary">
          <User className="h-5 w-5 text-primary" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  );
}
