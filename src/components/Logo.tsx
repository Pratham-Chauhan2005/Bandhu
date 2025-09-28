import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <path
          d="M35.6667 14.2857C35.6667 21.6191 20 33.3334 20 33.3334C20 33.3334 4.33334 21.6191 4.33334 14.2857C4.33334 10.4572 5.86013 6.79358 8.58332 4.1318C11.3065 1.47002 15.4803 0 20 0C24.5197 0 28.6935 1.47002 31.4167 4.1318C34.1399 6.79358 35.6667 10.4572 35.6667 14.2857Z"
          fill="#3EC9F4"
        />
        <path
          d="M20.0002 19.0476C22.955 19.0476 25.3335 16.7143 25.3335 13.8095C25.3335 10.9048 22.955 8.57143 20.0002 8.57143C17.0453 8.57143 14.6668 10.9048 14.6668 13.8095C14.6668 16.7143 17.0453 19.0476 20.0002 19.0476Z"
          fill="white"
        />
      </svg>
      <span className="font-headline text-xl font-bold text-foreground">
        Bandhu
      </span>
    </div>
  );
}
