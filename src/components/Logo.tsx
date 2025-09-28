import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image
        src="/logo.png"
        alt="Bandhu Local Logo"
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className="font-headline text-xl font-bold text-foreground">
        Bandhu
      </span>
    </div>
  );
}
