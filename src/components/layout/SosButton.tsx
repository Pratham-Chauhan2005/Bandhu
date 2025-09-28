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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import React, { useState, useRef, useCallback, useEffect } from 'react';

export default function SosButton() {
  const { toast } = useToast();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [countdown, setCountdown] = useState(5);
  
  const handleLiveSos = useCallback(() => {
    console.log('Live SOS Mode Activated: Starting 30-minute live location sharing and auto-call.');
    toast({
      title: '🚨 Live SOS Mode Activated',
      description: 'Live location sharing has begun. Help is on the way.',
      variant: 'destructive',
    });
  }, [toast]);

  const startHold = () => {
    setIsHolding(true);
    let t = 5;
    setCountdown(t);
    
    // Clear any existing timer
    if (timerRef.current) {
        clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
        t -= 1;
        setCountdown(t);
        if (t <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = null;
            handleLiveSos();
            setIsHolding(false); // End holding state
        }
    }, 1000);
  };

  const cancelHold = () => {
    // This function is called on mouse up / touch end.
    // If the timer is still running, it means it was a short press.
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setShowDialog(true); // Trigger quick SOS dialog
    }
    // If timer is null, it means the long press completed, so we do nothing.
    setIsHolding(false);
    setCountdown(5);
  };

  const handleQuickSos = () => {
    console.log('Quick SOS Activated: Sending location and profile to emergency contacts.');
    toast({
      title: '✅ SOS Activated',
      description: 'Your location has been sent to emergency contacts.',
      variant: 'destructive',
    });
    setShowDialog(false);
  };

  useEffect(() => {
    return () => { // Cleanup interval on unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <button
        onMouseDown={startHold}
        onMouseUp={cancelHold}
        onTouchStart={startHold}
        onTouchEnd={cancelHold}
        className={cn(
          'fixed bottom-20 right-4 h-16 w-16 rounded-full z-50 flex items-center justify-center text-white font-bold text-lg shadow-2xl',
          'bg-[#FF3B30] hover:bg-[#FF3B30]/90 active:scale-95 transition-all duration-200',
          isHolding && 'scale-110'
        )}
        style={{
          '--tw-shadow': '0 0 20px 5px rgba(255, 59, 48, 0.5)',
          animation: isHolding ? 'pulse-red 1.5s infinite' : 'none'
        }}
        aria-label="SOS Emergency Button"
      >
        {isHolding && countdown > 0 ? countdown : 'SOS'}
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
      <style jsx global>{`
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(255, 59, 48, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 59, 48, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          button {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
