import { useState, useCallback, useEffect, useRef } from 'react';
import { useAudioUnlock } from './useAudioUnlock';

type SoundType = 'success' | 'fail' | 'levelComplete' | 'gameComplete';

const SOUND_PATHS: Record<SoundType, string> = {
  success: '/assets/sounds/correct.mp3',
  fail: '/assets/sounds/wrong.mp3',
  levelComplete: '/assets/sounds/finish.mp3',
  gameComplete: '/assets/sounds/finish.mp3',
};

export function useSound() {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('puzzle-muted') === 'true';
    }
    return false;
  });

  const { isUnlocked } = useAudioUnlock();
  const audioInstancesRef = useRef<Record<SoundType, HTMLAudioElement>>({} as any);
  const pendingPlaybackRef = useRef<SoundType[]>([]);

  // Preload and cache audio instances
  useEffect(() => {
    Object.entries(SOUND_PATHS).forEach(([type, path]) => {
      const audio = new Audio(path);
      audio.volume = 0.5;
      audio.preload = 'auto';
      audioInstancesRef.current[type as SoundType] = audio;
    });

    return () => {
      // Cleanup audio instances
      Object.values(audioInstancesRef.current).forEach((audio) => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  // Retry pending playback after audio unlock
  useEffect(() => {
    if (isUnlocked && pendingPlaybackRef.current.length > 0) {
      const pending = [...pendingPlaybackRef.current];
      pendingPlaybackRef.current = [];
      pending.forEach((soundType) => {
        playSound(soundType);
      });
    }
  }, [isUnlocked]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('puzzle-muted', String(isMuted));
    }
  }, [isMuted]);

  const playSound = useCallback(
    (soundType: SoundType) => {
      if (isMuted) return;

      try {
        const audio = audioInstancesRef.current[soundType];
        if (!audio) {
          console.warn(`Audio instance not found for ${soundType}`);
          return;
        }

        // Reset audio to start
        audio.currentTime = 0;

        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // If autoplay is blocked and audio not yet unlocked, queue for retry
            if (!isUnlocked && error.name === 'NotAllowedError') {
              if (!pendingPlaybackRef.current.includes(soundType)) {
                pendingPlaybackRef.current.push(soundType);
              }
              console.warn(`Audio playback blocked for ${soundType}, will retry after user gesture`);
            } else {
              console.warn(`Failed to play sound ${soundType}:`, error);
            }
          });
        }
      } catch (error) {
        console.warn(`Failed to play sound ${soundType}:`, error);
      }
    },
    [isMuted, isUnlocked]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    isMuted,
    toggleMute,
    playSound,
  };
}
