import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

interface FailSafeChoicesProps {
  choices: string[];
  onCorrect: () => void;
  onIncorrect: () => void;
}

export function FailSafeChoices({ choices, onCorrect, onIncorrect }: FailSafeChoicesProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleChoice = (index: number) => {
    if (selectedIndex !== null) return;
    
    setSelectedIndex(index);
    // The first choice is always the correct answer
    if (index === 0) {
      setFeedback('correct');
      setTimeout(() => {
        onCorrect();
      }, 800);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
        setSelectedIndex(null);
        onIncorrect();
      }, 1000);
    }
  };

  return (
    <Card className="mx-auto max-w-md border-4 border-blue-400 shadow-xl panel-smooth animate-scaleIn">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-blue-800 flex items-center justify-center gap-2">
          <span className="text-3xl">🆘</span>
          Need Help?
        </CardTitle>
        <p className="text-sm font-medium text-gray-600 mt-2">
          Choose the correct answer from the options below
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {choices.map((choice, index) => (
          <Button
            key={index}
            onClick={() => handleChoice(index)}
            disabled={selectedIndex !== null}
            className={`w-full h-auto min-h-[60px] text-lg font-bold rounded-2xl transition-all ${
              selectedIndex === index && feedback === 'correct'
                ? 'bg-green-500 hover:bg-green-500 text-white border-4 border-green-600'
                : selectedIndex === index && feedback === 'incorrect'
                ? 'bg-red-500 hover:bg-red-500 text-white border-4 border-red-600'
                : 'bg-white hover:bg-blue-50 text-gray-800 border-4 border-blue-200 hover:border-blue-400'
            }`}
          >
            <span className="flex items-center justify-center gap-3 px-4 py-2">
              {selectedIndex === index && feedback === 'correct' && (
                <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
              )}
              {selectedIndex === index && feedback === 'incorrect' && (
                <XCircle className="h-6 w-6 flex-shrink-0" />
              )}
              <span className="text-center break-words">{choice}</span>
            </span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
