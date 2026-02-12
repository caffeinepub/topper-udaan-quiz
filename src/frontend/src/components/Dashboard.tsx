import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardDiamond } from './DashboardDiamond';
import { puzzleLevels } from '@/game/levels';
import { Play, Trophy, Lock } from 'lucide-react';

interface RewardPayload {
  uid: string;
  diamonds: number;
  rank?: number;
}

interface DashboardProps {
  playerName: string;
  currentProgress: number[];
  totalScore: number;
  onStartContinue: () => void;
  onSelectLevel: (levelIndex: number) => void;
  onShowLeaderboard: () => void;
  rewardPayload?: RewardPayload | null;
}

export function Dashboard({
  playerName,
  currentProgress,
  totalScore,
  onStartContinue,
  onSelectLevel,
  onShowLeaderboard,
  rewardPayload,
}: DashboardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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

  const isLevelUnlocked = (index: number) => {
    if (index === 0) return true;
    return currentProgress.includes(puzzleLevels[index - 1].id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 animate-slideDown">
      {/* Reward Card - Show only when game is completed */}
      {rewardPayload && (
        <DashboardDiamond
          playerName={playerName}
          diamonds={rewardPayload.diamonds}
          uid={rewardPayload.uid}
          rank={rewardPayload.rank}
        />
      )}

      {/* Header */}
      <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm card-enter">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-purple-600 mb-2">
            Welcome, {playerName}! 👋
          </CardTitle>
          <p className="text-xl font-bold text-gray-700">Choose your challenge</p>
          <p className="text-sm font-medium text-gray-600 mt-1">
            Created by SOUMYAJIT DUTTA
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4">
            <div className="text-center flex-1">
              <p className="text-sm font-medium text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-purple-600">
                {currentProgress.length}/{puzzleLevels.length}
              </p>
            </div>
            <div className="text-center flex-1">
              <p className="text-sm font-medium text-gray-600">Total Score</p>
              <p className="text-2xl font-bold text-orange-600">{totalScore} ⭐</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={onStartContinue}
              className="h-14 text-lg font-bold rounded-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white shadow-lg transition-smooth"
            >
              <Play className="mr-2 h-5 w-5" />
              {currentProgress.length === 0 ? 'Start Game' : 'Continue'}
            </Button>
            <Button
              onClick={onShowLeaderboard}
              variant="outline"
              className="h-14 text-lg font-bold rounded-full border-4 border-purple-200 hover:bg-purple-50 transition-smooth"
            >
              <Trophy className="mr-2 h-5 w-5" />
              Leaderboard
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Level Grid */}
      <Card className="border-none shadow-xl bg-white/95 backdrop-blur-sm card-enter">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-600 text-center">
            All Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {puzzleLevels.map((level, index) => {
                const isUnlocked = isLevelUnlocked(index);
                const isSolved = currentProgress.includes(level.id);

                return (
                  <button
                    key={level.id}
                    onClick={() => isUnlocked && onSelectLevel(index)}
                    disabled={!isUnlocked}
                    className={`relative aspect-square rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 hover:scale-105 shadow-lg cursor-pointer'
                        : 'bg-gray-200 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {isSolved && (
                      <div className="absolute top-2 right-2 text-2xl">✅</div>
                    )}
                    {!isUnlocked && (
                      <Lock className="absolute top-2 right-2 h-5 w-5 text-gray-500" />
                    )}
                    <div className="text-3xl font-bold text-purple-600">
                      {level.id}
                    </div>
                    <Badge
                      className={`text-xs font-bold text-white ${getDifficultyColor(
                        level.difficulty
                      )}`}
                    >
                      {level.difficulty}
                    </Badge>
                    <div className="text-sm font-bold text-orange-600">
                      {level.points} ⭐
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
