import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDiamonds } from '@/lib/rewards';

interface DiamondNotificationProps {
  playerName: string;
  diamonds: number;
  uid: string;
  rank?: number;
}

export function DiamondNotification({
  playerName,
  diamonds,
  uid,
  rank,
}: DiamondNotificationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show notification immediately
    setShow(true);

    // Auto-hide after 5 seconds
    const timer = setTimeout(() => setShow(false), 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 animate-scaleIn">
      <Card className="border-none shadow-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white overflow-hidden">
        <CardContent className="p-6 space-y-3 text-center">
          <div className="text-5xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold">Congrats, {playerName}!</h2>
          <div className="space-y-2 bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-lg font-semibold">
              💎 Diamonds Earned: <span className="text-yellow-300 font-bold">{formatDiamonds(diamonds)}</span>
            </p>
            <p className="text-sm font-medium">
              🆔 UID: <span className="font-mono font-bold">{uid}</span>
            </p>
            {rank && (
              <p className="text-lg font-semibold">
                🏆 Rank: <span className="text-yellow-300 font-bold">#{rank}</span>
              </p>
            )}
          </div>
          <p className="text-yellow-300 font-bold text-lg animate-pulse">
            Claim now before others!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
