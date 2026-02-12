import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface LevelCompletePanelProps {
  levelNumber: number;
  pointsEarned: number;
  totalScore: number;
  isLastLevel: boolean;
  onNext: () => void;
  onReplay: () => void;
  onBackToDashboard: () => void;
}

export function LevelCompletePanel({
  levelNumber,
  pointsEarned,
  totalScore,
  isLastLevel,
  onNext,
  onReplay,
  onBackToDashboard,
}: LevelCompletePanelProps) {
  return (
    <Card className="w-full max-w-md border-none shadow-2xl bg-white/95 backdrop-blur-sm card-enter">
      <CardHeader className="text-center pb-4">
        <div className="text-7xl mb-4 animate-bounce">🎉</div>
        <CardTitle className="text-3xl font-bold text-purple-600 mb-2">
          Level {levelNumber} Complete!
        </CardTitle>
        <p className="text-gray-600 font-medium text-lg">Great job!</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium text-lg">Points Earned</span>
            <span className="text-orange-600 font-bold text-3xl">+{pointsEarned} ⭐</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Total Score</span>
            <span className="text-purple-600 font-bold text-2xl">{totalScore} ⭐</span>
          </div>
        </div>

        <div className="space-y-3">
          {!isLastLevel && (
            <Button
              onClick={onNext}
              className="w-full h-14 text-lg font-bold rounded-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white shadow-lg transition-smooth"
            >
              Next Level 🚀
            </Button>
          )}
          {isLastLevel && (
            <Button
              onClick={onNext}
              className="w-full h-14 text-lg font-bold rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg transition-smooth"
            >
              Finish Game 🏆
            </Button>
          )}
          <Button
            onClick={onReplay}
            variant="outline"
            className="w-full h-14 text-lg font-bold rounded-full border-4 border-purple-200 hover:bg-purple-50 transition-smooth"
          >
            Replay Level 🔄
          </Button>
          <Button
            onClick={onBackToDashboard}
            variant="outline"
            className="w-full h-14 text-lg font-bold rounded-full border-4 border-gray-200 hover:bg-gray-50 transition-smooth"
          >
            <Home className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
