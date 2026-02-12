import { useEffect, useRef, useState } from 'react';

// Declare YouTube IFrame API types
interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  mute: () => void;
  unMute: () => void;
  setVolume: (volume: number) => void;
  isMuted: () => boolean;
  destroy: () => void;
}

interface YTPlayerConfig {
  videoId: string;
  playerVars?: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    modestbranding?: 0 | 1;
    rel?: 0 | 1;
    showinfo?: 0 | 1;
    fs?: 0 | 1;
    playsinline?: 0 | 1;
  };
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: { target: YTPlayer; data: number }) => void;
  };
}

interface YTNamespace {
  Player: new (elementId: string, config: YTPlayerConfig) => YTPlayer;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}

declare global {
  interface Window {
    YT: YTNamespace;
    onYouTubeIframeAPIReady: () => void;
    __ytIframeAPILoading?: boolean;
    __ytIframeAPIReady?: boolean;
  }
}

const YOUTUBE_URL = "https://youtu.be/FJuR5mfEU_k?si=gUWQCKXNK-ivBMOB";

// Extract video ID from YouTube URL
function extractVideoId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/,
    /youtube\.com\/embed\/([^&?/]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return '';
}

export function useHiddenYouTube(containerId: string) {
  const playerRef = useRef<YTPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const hasUserInteractedRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const unmuteAttemptedRef = useRef(false);
  const initializationAttemptedRef = useRef(false);
  const videoId = extractVideoId(YOUTUBE_URL);

  // Single effect to handle YouTube API loading and player initialization
  useEffect(() => {
    if (!videoId || initializationAttemptedRef.current) return;
    initializationAttemptedRef.current = true;

    const initializePlayer = () => {
      // Guard: only create player once
      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player(containerId, {
          videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
            fs: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => {
              setIsReady(true);
              // Mute initially to increase chances of autoplay working
              event.target.mute();
              
              // If user already interacted before player was ready, start playback now
              if (pendingPlayRef.current && playerRef.current) {
                try {
                  playerRef.current.playVideo();
                  // Attempt to unmute and set volume
                  attemptUnmute(playerRef.current);
                } catch (error) {
                  console.error('Failed to play YouTube video on ready:', error);
                }
              }
            },
          },
        });
      } catch (error) {
        console.error('Failed to initialize YouTube player:', error);
      }
    };

    // Load YouTube IFrame API if not already loaded
    if (window.__ytIframeAPIReady || window.YT) {
      initializePlayer();
    } else if (!window.__ytIframeAPILoading) {
      window.__ytIframeAPILoading = true;
      
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Store original callback if it exists
      const originalCallback = window.onYouTubeIframeAPIReady;
      
      window.onYouTubeIframeAPIReady = () => {
        window.__ytIframeAPIReady = true;
        window.__ytIframeAPILoading = false;
        
        // Call original callback if it existed
        if (originalCallback && typeof originalCallback === 'function') {
          originalCallback();
        }
        
        initializePlayer();
      };
    }

    return () => {
      // Cleanup player on unmount
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (error) {
          console.error('Failed to destroy YouTube player:', error);
        }
        playerRef.current = null;
      }
    };
  }, [containerId, videoId]);

  // Helper function to attempt unmuting
  const attemptUnmute = (player: YTPlayer) => {
    if (unmuteAttemptedRef.current) return;
    
    try {
      player.unMute();
      player.setVolume(60);
      unmuteAttemptedRef.current = true;
      
      // Check if unmute was successful after a short delay
      setTimeout(() => {
        try {
          if (player.isMuted && player.isMuted()) {
            // Unmute was blocked, set up retry on next gesture
            setupUnmuteRetry(player);
          }
        } catch (error) {
          // Ignore errors checking mute state
        }
      }, 100);
    } catch (error) {
      console.error('Failed to unmute YouTube video:', error);
      // Set up retry on next gesture
      setupUnmuteRetry(player);
    }
  };

  // Helper function to set up unmute retry on next user gesture
  const setupUnmuteRetry = (player: YTPlayer) => {
    const retryUnmute = () => {
      try {
        player.unMute();
        player.setVolume(60);
        // Remove listeners after successful retry
        document.removeEventListener('click', retryUnmute, { capture: true });
        document.removeEventListener('touchstart', retryUnmute, { capture: true });
        document.removeEventListener('keydown', retryUnmute, { capture: true });
      } catch (error) {
        console.error('Failed to retry unmute:', error);
      }
    };

    // Set up one-time listeners for next gesture
    document.addEventListener('click', retryUnmute, { once: true, capture: true });
    document.addEventListener('touchstart', retryUnmute, { once: true, capture: true });
    document.addEventListener('keydown', retryUnmute, { once: true, capture: true });
  };

  // Separate effect for first interaction handling
  useEffect(() => {
    if (hasUserInteractedRef.current) return;

    const handleFirstInteraction = () => {
      if (hasUserInteractedRef.current) return;
      hasUserInteractedRef.current = true;
      pendingPlayRef.current = true;
      
      if (isReady && playerRef.current) {
        try {
          playerRef.current.playVideo();
          // Attempt to unmute and set volume
          attemptUnmute(playerRef.current);
        } catch (error) {
          console.error('Failed to play YouTube video:', error);
        }
      }
      // If player is not ready yet, pendingPlayRef will trigger playback in onReady
    };

    // Use capture phase to catch interaction early
    document.addEventListener('click', handleFirstInteraction, { once: true, capture: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true, capture: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true, capture: true });

    return () => {
      // Clean up with matching options
      document.removeEventListener('click', handleFirstInteraction, { capture: true });
      document.removeEventListener('touchstart', handleFirstInteraction, { capture: true });
      document.removeEventListener('keydown', handleFirstInteraction, { capture: true });
    };
  }, [isReady]);

  return { player: playerRef.current, isReady };
}
