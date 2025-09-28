'use client';

import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function FloatingHomestayButton() {
  return (
    <Link href="/homestays" passHref>
      <Button
        size="icon"
        className="fixed bottom-28 right-4 h-16 w-16 rounded-full shadow-2xl z-40 bg-primary hover:bg-primary/90 flex items-center justify-center"
        aria-label="Homestays Button"
      >
        <Home className="h-8 w-8" />
      </Button>
    </Link>
  );
}
