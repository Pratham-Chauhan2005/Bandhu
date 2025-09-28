'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Zap, User, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import SosButton from './SosButton';


const navItems = [
    { href: '/tracking', icon: Map, label: 'Tracking' },
    { href: '/itinerary', icon: Zap, label: 'Itinerary' },
    { href: '/', icon: Home, label: 'Home' },
    { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  const isNavItemActive = (href: string) => {
    if (href === '/') {
        return pathname === '/';
    }
    return pathname.startsWith(href);
  }

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-24 bg-transparent md:hidden">
      <div className="relative grid h-full grid-cols-5 mx-auto font-medium items-center">
        
        <Link href="/tracking" className={cn('inline-flex flex-col items-center justify-center px-2 hover:bg-muted/50 group h-full', isNavItemActive('/tracking') ? 'text-primary' : 'text-muted-foreground')}>
            <Map className="w-6 h-6 mb-1" />
            <span className="text-xs">{navItems.find(i=>i.label === 'Tracking')?.label}</span>
        </Link>
        
        <Link href="/itinerary" className={cn('inline-flex flex-col items-center justify-center px-2 hover:bg-muted/50 group h-full', isNavItemActive('/itinerary') ? 'text-primary' : 'text-muted-foreground')}>
          <Zap className="w-6 h-6 mb-1" />
          <span className="text-xs">{navItems.find(i=>i.label === 'Itinerary')?.label}</span>
        </Link>
        
        <div className="absolute left-1/2 -translate-x-1/2 bottom-5">
            <Link href="/" className={cn('inline-flex flex-col items-center justify-center group')}>
                <div className={cn('flex items-center justify-center w-16 h-16 rounded-full text-primary-foreground shadow-lg', isNavItemActive('/') ? 'bg-primary ring-4 ring-background' : 'bg-primary/80')}>
                    <Home className="w-8 h-8" />
                </div>
            </Link>
        </div>

        <div className="col-start-4">
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button className={cn('inline-flex flex-col items-center justify-center px-2 group h-full w-full text-destructive')}>
                        <AlertTriangle className="w-6 h-6 mb-1" />
                        <span className="text-xs">SOS</span>
                    </button>
                </AlertDialogTrigger>
                <SosButton standalone={false} />
            </AlertDialog>
        </div>
        
        <Link href="/profile" className={cn('inline-flex flex-col items-center justify-center px-2 hover:bg-muted/50 group h-full', isNavItemActive('/profile') ? 'text-primary' : 'text-muted-foreground')}>
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs">{navItems.find(i=>i.label === 'Profile')?.label}</span>
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-background/90 backdrop-blur-sm border-t -z-10"></div>
    </div>
  );
}
