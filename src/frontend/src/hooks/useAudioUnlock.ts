import { useState, useEffect } from 'react';

/**
 * Hook to detect first user gesture and unlock audio playback.
 * Many browsers block audio autoplay until user interaction.
 */
export function useAudioUnlock() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (isUnlocked) return;

    const unlockAudio = () => {
      setIsUnlocked(true);
    };

    // Listen for first user gesture
    const events = ['pointerdown', 'keydown', 'touchstart'];
    events.forEach((event) => {
      window.addEventListener(event, unlockAudio, { once: true });
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, unlockAudio);
      });
    };
  }, [isUnlocked]);

  return { isUnlocked };
}
