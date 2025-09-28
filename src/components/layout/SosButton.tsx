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
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

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

  const startCountdown = useCallback(() => {
    setIsHolding(true);
    setCountdown(5);
    countdownInterval.current = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);
    holdTimeout.current = setTimeout(() => {
      if (countdownInterval.current) clearInterval(countdownInterval.current);
      handleLiveSos();
      setIsHolding(false);
    }, 5000); // 5-second hold
  },[handleLiveSos]);


  const cancelCountdown = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);
    
    // If it was a short press (not a long hold), trigger quick SOS dialog
    if (isHolding) {
      setShowDialog(true);
    }
    setIsHolding(false);
  }

  useEffect(() => {
    return () => { // Cleanup timeouts and intervals on unmount
      if (holdTimeout.current) clearTimeout(holdTimeout.current);
      if (countdownInterval.current) clearInterval(countdownInterval.current);
    };
  }, []);

  return (
    <>
      <button
        onMouseDown={startCountdown}
        onMouseUp={cancelCountdown}
        onTouchStart={startCountdown}
        onTouchEnd={cancelCountdown}
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
        {isHolding ? countdown : 'SOS'}
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
