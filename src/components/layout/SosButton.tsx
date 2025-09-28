'use client';

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
import { Button } from '@/components/ui/button';
import { Siren } from 'lucide-react';

export default function SosButton({ standalone = true }: { standalone?: boolean }) {
  const content = (
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
        <AlertDialogAction className="bg-destructive hover:bg-destructive/90">
          Confirm Emergency
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );

  if (standalone) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="icon"
            className="fixed bottom-28 right-4 h-16 w-16 rounded-full shadow-2xl z-40 bg-destructive hover:bg-destructive/90 animate-pulse hidden md:flex"
            aria-label="SOS Emergency Button"
          >
            <Siren className="h-8 w-8" />
          </Button>
        </AlertDialogTrigger>
        {content}
      </AlertDialog>
    );
  }

  return content;
}
