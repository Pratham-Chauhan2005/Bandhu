
'use client';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  Search,
  Briefcase,
  UtensilsCrossed,
  CalendarDays,
  Map,
  Settings,
  Star,
  Zap,
  User,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Logo from '../Logo';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/explore', icon: Search, label: 'Explore' },
  { href: '/hire', icon: Briefcase, label: 'Hire a Bandhu' },
  { href: '/food', icon: UtensilsCrossed, label: 'Local Foods' },
  { href: '/events', icon: CalendarDays, label: 'Events' },
  { href: '/homestays', icon: Home, label: 'Homestays' },
  { href: '/itinerary', icon: Zap, label: 'Itinerary AI' },
  { href: '/tracking', icon: Map, label: 'Tracking' },
];

const bottomNavItems = [
  { href: '/profile', icon: User, label: 'Profile' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 text-primary font-headline font-bold text-lg">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <div className='flex justify-between items-center px-2 mb-2'>
            <SidebarGroupLabel className='px-0'>Menu</SidebarGroupLabel>
            <SidebarTrigger className={cn(
              "h-7 w-7 group-data-[collapsible=icon]:hidden",
               state === 'collapsed' && 'hidden'
            )} />
          </div>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                <Link href={item.href}>
                  <item.icon className="text-primary" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="gap-0">
        <Separator className="mb-2" />
        <div className="p-2 group-data-[collapsible=icon]:p-1">
          <Button asChild className="w-full justify-start group-data-[collapsible=icon]:justify-center bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/become-a-bandhu">
              <Star />
              <span className="font-bold group-data-[collapsible=icon]:hidden">Become a Bandhu</span>
            </Link>
          </Button>
        </div>
        <Separator className="my-2" />
        <SidebarMenu>
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                <Link href={item.href}>
                  <item.icon className="text-primary"/>
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
