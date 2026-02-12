declare global {
  interface Window {
    confetti?: (options: {
      particleCount: number;
      spread: number;
      origin: { y: number };
    }) => void;
  }
}

export function triggerCelebration() {
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  }
}

export function triggerLevelCompleteCelebration() {
  if (typeof window !== 'undefined' && window.confetti) {
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}
