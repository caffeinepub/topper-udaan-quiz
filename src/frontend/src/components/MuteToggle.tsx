import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSound } from '../hooks/useSound';

export function MuteToggle() {
  const { isMuted, toggleMute } = useSound();

  return (
    <Button
      onClick={toggleMute}
      size="icon"
      className="bg-white/90 hover:bg-white text-purple-600 rounded-full shadow-lg h-12 w-12 transition-all duration-200 hover:scale-110 active:scale-95"
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
    </Button>
  );
}
