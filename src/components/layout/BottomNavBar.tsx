'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Siren, Zap, User } from 'lucide-react';
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
import { Button } from '../ui/button';

const navItems = [
  { href: '/tracking', icon: Map, label: 'Tracking' },
  { href: '/sos', icon: Siren, label: 'SOS', isSos: true },
  { href: '/', icon: Home, label: 'Home' },
  { href: '/itinerary', icon: Zap, label: 'AI Itinerary' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-20 bg-secondary/95 backdrop-blur-sm border-t md:hidden">
      <div className="grid h-full grid-cols-5 mx-auto">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;

          if (item.isSos) {
            return (
              <AlertDialog key={item.href}>
                <AlertDialogTrigger asChild>
                  <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-muted-foreground/10 group cursor-pointer">
                    <Siren
                      className={cn(
                        'w-7 h-7 mb-1 text-muted-foreground group-hover:text-destructive',
                        isActive ? 'text-destructive' : ''
                      )}
                    />
                     <span className="text-xs text-muted-foreground group-hover:text-destructive">
                      {item.label}
                    </span>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you in an emergency?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Pressing "Confirm" will immediately send your live location and personal details to our 24/7 support team and your emergency contacts.
                      <br /><br />
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
            );
          }
          
          const isCenter = index === 2;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex flex-col items-center justify-center px-2 sm:px-5 hover:bg-muted-foreground/10 group',
                 isCenter ? 'relative' : ''
              )}
            >
             {isCenter ? (
                 <div className="absolute -top-5 flex items-center justify-center h-16 w-16 rounded-full bg-primary shadow-lg">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                 </div>
             ) : (
                <item.icon
                    className={cn(
                    'w-7 h-7 mb-1 text-muted-foreground group-hover:text-primary',
                    isActive ? 'text-primary' : ''
                    )}
                />
             )}
              <span
                className={cn(
                  'text-xs text-muted-foreground group-hover:text-primary',
                  isActive ? 'text-primary' : '',
                  isCenter ? 'mt-10' : ''
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
