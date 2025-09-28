'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, Zap, User, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScroll } from '@/hooks/use-scroll';

const navItems = [
    { href: '/tracking', icon: Map, label: 'Tracking' },
    { href: '/itinerary', icon: Zap, label: 'Itinerary' },
    { href: '/', icon: Home, label: 'Home' },
    { href: '/hire', icon: Briefcase, label: 'Hire' },
    { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNavBar() {
  const pathname = usePathname();
  const { scrollDirection } = useScroll(20);

  const isNavItemActive = (href: string) => {
    if (href === '/') {
        return pathname === '/';
    }
    return pathname.startsWith(href);
  }

  return (
    <div className={cn(
        "fixed bottom-0 left-0 z-40 w-full h-16 bg-background/90 backdrop-blur-sm border-t md:hidden transition-transform duration-150 ease-out",
        scrollDirection === 'down' ? 'translate-y-full' : 'translate-y-0'
    )}>
      <div className="grid h-full grid-cols-5 mx-auto font-medium items-center">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-2 hover:bg-muted/50 group h-full',
              isNavItemActive(item.href) ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
