import { useState } from 'react';
import { PuzzleStage } from './PuzzleStage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TextRiddlePuzzleProps {
  levelId: number;
  onSolved: () => void;
  onIncorrect: () => void;
}

export function TextRiddlePuzzle({ levelId, onSolved, onIncorrect }: TextRiddlePuzzleProps) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const getRiddleConfig = () => {
    const configs: Record<number, { answers: string[] }> = {
      6: { answers: ['keyboard', 'piano'] },
      9: { answers: ['clock', 'watch', 'timer'] },
      12: { answers: ['towel', 'sponge', 'cloth'] },
      15: { answers: ['stamp', 'postcard', 'envelope'] },
      17: { answers: ['ai', 'neural network', 'algorithm'] },
      20: { answers: ['knife', 'brain', 'skill'] },
      23: { answers: ['rain', 'snow', 'leaves'] },
      26: { answers: ['clock', 'watch', 'timer'] },
      30: { answers: ['account', 'profile', 'page'] },
    };
    return configs[levelId] || configs[6];
  };

  const handleSubmit = () => {
    if (feedback || !answer.trim()) return;

    const config = getRiddleConfig();
    const normalizedAnswer = answer.trim().toLowerCase();
    const isCorrect = config.answers.some((validAnswer) =>
      normalizedAnswer.includes(validAnswer.toLowerCase())
    );

    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => {
        onSolved();
        setFeedback(null);
        setAnswer('');
      }, 800);
    } else {
      setFeedback('wrong');
      onIncorrect();
      setTimeout(() => {
        setFeedback(null);
      }, 500);
    }
  };

  return (
    <PuzzleStage>
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div
            className={`bg-white rounded-3xl p-6 shadow-xl ${
              feedback === 'wrong' ? 'animate-pulse' : ''
            }`}
          >
            <Input
              type="text"
              placeholder="Type your answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className={`h-14 text-lg rounded-2xl border-4 ${
                feedback === 'correct'
                  ? 'border-green-400 bg-green-50'
                  : feedback === 'wrong'
                    ? 'border-red-400 bg-red-50'
                    : 'border-purple-200 focus:border-purple-400'
              }`}
              disabled={!!feedback}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!!feedback || !answer.trim()}
            className="w-full h-14 text-lg font-bold rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg disabled:opacity-50"
          >
            Submit Answer
          </Button>
        </div>
      </div>
      {feedback === 'correct' && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-400/50 animate-fadeIn">
          <div className="text-6xl">✨</div>
        </div>
      )}
    </PuzzleStage>
  );
}
