import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDiamonds } from '@/lib/rewards';

interface DashboardDiamondProps {
  playerName: string;
  diamonds: number;
  uid: string;
  rank?: number;
}

export function DashboardDiamond({
  playerName,
  diamonds,
  uid,
  rank,
}: DashboardDiamondProps) {
  return (
    <Card className="border-none shadow-xl bg-gradient-to-br from-green-400 to-emerald-500 text-white overflow-hidden card-enter">
      <CardContent className="p-6 space-y-3 text-center">
        <div className="text-4xl mb-2">🎉</div>
        <h2 className="text-2xl font-bold">Congrats, {playerName}!</h2>
        <div className="space-y-2 bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <p className="text-lg font-semibold">
            💎 Diamonds Earned: <span className="text-yellow-200 font-bold">{formatDiamonds(diamonds)}</span>
          </p>
          <p className="text-sm font-medium">
            🆔 Your UID: <span className="font-mono font-bold">{uid}</span>
          </p>
          {rank && (
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-semibold">🏆 Rank:</span>
              <Badge className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 text-lg font-bold px-3 py-1">
                #{rank}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
