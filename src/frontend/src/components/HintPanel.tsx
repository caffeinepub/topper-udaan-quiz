import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, X } from 'lucide-react';

interface HintPanelProps {
  hint: string;
  isVisible: boolean;
  onToggle: () => void;
}

export function HintPanel({ hint, isVisible, onToggle }: HintPanelProps) {
  if (!hint) return null;

  return (
    <div className="mx-auto max-w-md">
      {!isVisible ? (
        <Button
          onClick={onToggle}
          className="w-full h-14 text-lg font-bold rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white shadow-lg"
        >
          <Lightbulb className="mr-2 h-5 w-5" />
          Need a Hint?
        </Button>
      ) : (
        <Card className="border-4 border-yellow-400 shadow-xl bg-gradient-to-br from-yellow-50 to-amber-50 animate-fadeIn">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-yellow-800">Hint</h3>
              </div>
              <Button
                onClick={onToggle}
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-yellow-700 hover:text-yellow-900 hover:bg-yellow-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-lg font-medium text-gray-700">{hint}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
