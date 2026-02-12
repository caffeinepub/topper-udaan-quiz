import { ReactNode } from 'react';
import { MuteToggle } from './MuteToggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Home } from 'lucide-react';

interface GameShellProps {
  children: ReactNode;
  currentLevel: number;
  totalLevels: number;
  score: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onShowLeaderboard: () => void;
  onBackToDashboard: () => void;
}

export function GameShell({
  children,
  currentLevel,
  totalLevels,
  score,
  difficulty,
  onShowLeaderboard,
  onBackToDashboard,
}: GameShellProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-green-500 hover:bg-green-600';
      case 'Medium':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Hard':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #FFF8DC 100%)',
      }}
    >
      {/* Floating clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cloud cloud-1">☁️</div>
        <div className="cloud cloud-2">☁️</div>
        <div className="cloud cloud-3">☁️</div>
      </div>

      {/* Top HUD */}
      <div className="relative z-10 p-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Badge className="text-lg font-bold px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white">
              Level {currentLevel}/{totalLevels}
            </Badge>
            <Badge
              className={`text-lg font-bold px-4 py-2 text-white ${getDifficultyColor(
                difficulty
              )}`}
            >
              {difficulty}
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
              <span className="text-xl font-bold text-orange-600">{score} ⭐</span>
            </div>
            <Button
              onClick={onBackToDashboard}
              size="icon"
              className="h-12 w-12 rounded-full bg-white hover:bg-gray-100 text-gray-800 shadow-lg"
            >
              <Home className="h-5 w-5" />
            </Button>
            <Button
              onClick={onShowLeaderboard}
              size="icon"
              className="h-12 w-12 rounded-full bg-white hover:bg-gray-100 text-gray-800 shadow-lg"
            >
              <Trophy className="h-5 w-5" />
            </Button>
            <MuteToggle />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center p-4 min-h-[calc(100vh-120px)]">
        {children}
      </div>
    </div>
  );
}
