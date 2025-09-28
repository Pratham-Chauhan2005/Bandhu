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
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Siren } from 'lucide-react';
import React, { useState, useRef, useCallback } from 'react';

export default function SosButton() {
  const { toast } = useToast();
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleQuickSos = () => {
    console.log('Quick SOS Activated: Sending location and profile to emergency contacts.');
    toast({
      title: '✅ SOS Activated',
      description: 'Your location has been sent to emergency contacts.',
      variant: 'destructive',
    });
    setShowDialog(false);
  };

  const handleLiveSos = useCallback(() => {
    console.log('Live SOS Mode Activated: Starting 30-minute live location sharing and auto-call.');
    toast({
      title: '🚨 Live SOS Mode Activated',
      description: 'Live location sharing has begun. Help is on the way.',
      variant: 'destructive',
    });
    // Add logic for live sharing and auto-call here
  }, [toast]);

  const handleMouseDown = () => {
    setIsHolding(true);
    holdTimeout.current = setTimeout(() => {
      if (isHolding) {
        handleLiveSos();
      }
      setIsHolding(false); // Reset after action
    }, 2000); // 2-second hold
  };

  const handleMouseUp = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
    }
    // If it was a short press (not a long hold), trigger quick SOS dialog
    if (isHolding) {
      setShowDialog(true);
    }
    setIsHolding(false);
  };

  const handleTouchStart = () => {
    handleMouseDown();
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  return (
    <>
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={cn(
          'fixed bottom-20 right-4 h-16 w-16 rounded-full z-50 flex items-center justify-center text-white font-bold text-lg shadow-2xl',
          'bg-[#FF3B30] hover:bg-[#FF3B30]/90 active:scale-95 transition-all duration-200',
          isHolding && 'animate-pulse scale-110'
        )}
        aria-label="SOS Emergency Button"
      >
        SOS
      </button>

      {showDialog && (
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Emergency</AlertDialogTitle>
            <AlertDialogDescription>
              This will immediately send your location and details to your emergency contacts and local services.
              <br /><br />
              <strong>Only use this in a genuine emergency.</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleQuickSos}
            >
              Confirm SOS
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      )}
    </>
  );
}
