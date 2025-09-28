'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Zap, User, MessageSquare, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const navItems = [
    { href: '/tracking', icon: Map, label: 'Tracking' },
    { href: '/', icon: Home, label: 'Home' },
    { href: '/itinerary', icon: Zap, label: 'Itinerary' },
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
    <div className="fixed bottom-0 left-0 z-50 w-full h-20 bg-background/90 backdrop-blur-sm border-t md:hidden">
      <div className="grid h-full grid-cols-5 mx-auto font-medium">
        
        <Link href="/tracking" className={cn('inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group', isNavItemActive('/tracking') ? 'text-primary' : 'text-muted-foreground')}>
            <Map className="w-6 h-6 mb-1" />
            <span className="text-xs">Tracking</span>
        </Link>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className='inline-flex flex-col items-center justify-center px-5 text-red-500 group'>
                <div className='w-12 h-12 rounded-full bg-red-100 flex items-center justify-center'>
                    <AlertTriangle className="w-6 h-6" />
                </div>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you in an emergency?</AlertDialogTitle>
              <AlertDialogDescription>
                Pressing "Confirm" will immediately send your live location and personal details to our 24/7 support team and your emergency contacts.
                <br/><br/>
                <strong>Only use this in a genuine emergency.</strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                Confirm Emergency
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Link href="/" className={cn('inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group -mt-8')}>
            <div className={cn('flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg', isNavItemActive('/') && 'ring-4 ring-background')}>
                <Home className="w-8 h-8" />
            </div>
            <span className={cn('text-xs mt-1', isNavItemActive('/') ? 'text-primary' : 'text-muted-foreground' )}>Home</span>
        </Link>
        
        <Link href="/itinerary" className={cn('inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group', isNavItemActive('/itinerary') ? 'text-primary' : 'text-muted-foreground')}>
          <Zap className="w-6 h-6 mb-1" />
          <span className="text-xs">Itinerary</span>
        </Link>

        <Link href="/profile" className={cn('inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group', isNavItemActive('/profile') ? 'text-primary' : 'text-muted-foreground')}>
          <User className="w-6 h-6 mb-1" />
          <span className="text-xs">Profile</span>
        </Link>

      </div>
    </div>
  );
}