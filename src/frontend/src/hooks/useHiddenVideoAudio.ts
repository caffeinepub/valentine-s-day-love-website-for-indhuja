import { useRef, useEffect, useCallback } from 'react';

interface UseHiddenVideoAudioReturn {
  song1Ref: React.RefObject<HTMLAudioElement | null>;
  song2Ref: React.RefObject<HTMLAudioElement | null>;
  switchToSong2: () => void;
}

export function useHiddenVideoAudio(): UseHiddenVideoAudioReturn {
  const song1Ref = useRef<HTMLAudioElement>(null);
  const song2Ref = useRef<HTMLAudioElement>(null);
  const hasStarted = useRef(false);
  const listenersAttached = useRef(false);

  // Switch from song1 to song2
  const switchToSong2 = useCallback(() => {
    const song1 = song1Ref.current;
    const song2 = song2Ref.current;
    
    if (!song1 || !song2) return;

    // Mark as started to prevent song1 from playing later
    hasStarted.current = true;

    // Stop song1 immediately
    song1.pause();
    song1.currentTime = 0;

    // Configure and play song2 from beginning
    song2.currentTime = 0;
    song2.loop = false;
    song2.volume = 0.0;
    song2.play().catch(() => {
      // Retry on next user gesture if needed
      console.log('Song2 play blocked, will retry on next gesture');
    });
  }, []);

  // Set up first-tap listener to start song1
  useEffect(() => {
    const song1 = song1Ref.current;
    if (!song1 || listenersAttached.current) return;

    const startOnFirstTap = (e: Event) => {
      // Check if already started (e.g., by CTA click)
      if (hasStarted.current) return;
      
      hasStarted.current = true;

      // Configure and play song1
      song1.currentTime = 0;
      song1.volume = 0.4;
      song1.loop = false;
      
      song1.play().catch((err) => {
        console.log('Song1 play blocked:', err);
        // Reset hasStarted so it can retry on next gesture
        hasStarted.current = false;
      });

      // Remove all listeners after successful start
      removeListeners();
    };

    const removeListeners = () => {
      document.removeEventListener('click', startOnFirstTap, true);
      document.removeEventListener('touchstart', startOnFirstTap, true);
      document.removeEventListener('touchend', startOnFirstTap, true);
      document.removeEventListener('pointerdown', startOnFirstTap, true);
      listenersAttached.current = false;
    };

    // Use capture phase to ensure we catch events even on interactive elements
    document.addEventListener('click', startOnFirstTap, { capture: true });
    document.addEventListener('touchstart', startOnFirstTap, { capture: true, passive: true });
    document.addEventListener('touchend', startOnFirstTap, { capture: true, passive: true });
    document.addEventListener('pointerdown', startOnFirstTap, { capture: true });
    listenersAttached.current = true;

    return () => {
      removeListeners();
    };
  }, []);

  return {
    song1Ref,
    song2Ref,
    switchToSong2,
  };
}
