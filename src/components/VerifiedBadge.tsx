import { ShieldCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function VerifiedBadge() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="bg-blue-500 text-white rounded-full p-1.5 shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Verified Bandhu</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
