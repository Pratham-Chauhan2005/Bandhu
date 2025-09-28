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
import { AlertTriangle, Siren } from 'lucide-react';

export default function SosButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          className="fixed bottom-24 right-6 h-16 w-16 rounded-full shadow-2xl z-40 bg-red-600 hover:bg-red-700 animate-pulse flex"
          aria-label="SOS Emergency Button"
        >
          <Siren className="h-8 w-8" />
        </Button>
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
  );
}
