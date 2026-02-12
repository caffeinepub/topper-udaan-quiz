import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LeaderboardEntry } from '../backend';

interface LeaderboardPanelProps {
  leaderboard?: LeaderboardEntry[];
  isLoading: boolean;
}

export function LeaderboardPanel({ leaderboard, isLoading }: LeaderboardPanelProps) {
  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

  return (
    <Card className="w-full border-none shadow-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white animate-fadeIn">
      <CardHeader className="text-center pb-4">
        <div className="text-6xl mb-2">🏆</div>
        <CardTitle className="text-3xl font-bold">Top Players</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">⏳</div>
            <p className="font-medium">Loading scores...</p>
          </div>
        ) : !leaderboard || leaderboard.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p className="font-medium">No scores yet!</p>
            <p className="text-sm opacity-90 mt-2">Be the first to complete the game!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between hover:bg-white/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{medals[index]}</span>
                  <div>
                    <p className="font-bold text-lg">{entry.name}</p>
                    <p className="text-sm opacity-90">Rank #{index + 1}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl">{Number(entry.score)} ⭐</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
