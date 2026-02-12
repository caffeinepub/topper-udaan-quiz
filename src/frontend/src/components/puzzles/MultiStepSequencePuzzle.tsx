import { useState } from 'react';
import { PuzzleStage } from './PuzzleStage';

interface MultiStepSequencePuzzleProps {
  levelId: number;
  onSolved: () => void;
  onIncorrect: () => void;
}

export function MultiStepSequencePuzzle({
  levelId,
  onSolved,
  onIncorrect,
}: MultiStepSequencePuzzleProps) {
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleClick = (clickedItem: 'bulb' | 'switch' | 'plug' | 'power') => {
    if (feedback) return;

    // Level 3: NEW - Turn on light (bulb then switch)
    if (levelId === 3) {
      if (step === 0 && clickedItem === 'bulb') {
        setStep(1);
      } else if (step === 1 && clickedItem === 'switch') {
        setFeedback('correct');
        setTimeout(() => {
          onSolved();
          setStep(0);
          setFeedback(null);
        }, 800);
      } else {
        setFeedback('wrong');
        onIncorrect();
        setTimeout(() => {
          setFeedback(null);
          setStep(0);
        }, 500);
      }
    }
    // Level 27: Smart home (plug then power)
    else if (levelId === 27) {
      if (step === 0 && clickedItem === 'plug') {
        setStep(1);
      } else if (step === 1 && clickedItem === 'power') {
        setFeedback('correct');
        setTimeout(() => {
          onSolved();
          setStep(0);
          setFeedback(null);
        }, 800);
      } else {
        setFeedback('wrong');
        onIncorrect();
        setTimeout(() => {
          setFeedback(null);
          setStep(0);
        }, 500);
      }
    }
  };

  // Level 3: NEW - Turn on the light
  if (levelId === 3) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-12">
            {/* Light bulb */}
            <button
              onClick={() => handleClick('bulb')}
              className={`w-32 h-32 rounded-full flex items-center justify-center text-8xl transition-all transform hover:scale-110 active:scale-95 ${
                step >= 1 ? 'bg-yellow-300 shadow-[0_0_40px_rgba(253,224,71,0.8)]' : 'bg-gray-300'
              } ${feedback === 'wrong' ? 'animate-pulse' : ''}`}
              style={{
                boxShadow: step >= 1 ? '0 0 40px rgba(253,224,71,0.8)' : '0 8px 16px rgba(0,0,0,0.2)',
              }}
            >
              💡
            </button>

            {/* Switch */}
            <button
              onClick={() => handleClick('switch')}
              className={`w-24 h-24 rounded-2xl flex items-center justify-center text-6xl transition-all transform hover:scale-110 active:scale-95 ${
                step >= 1 ? 'bg-green-400' : 'bg-gray-400'
              }`}
              style={{
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              }}
            >
              {step >= 1 ? '🟢' : '⚪'}
            </button>

            {step === 1 && (
              <div className="text-sm font-bold text-white bg-purple-600 px-4 py-2 rounded-full animate-fadeIn">
                Now flip the switch! 👆
              </div>
            )}
          </div>
        </div>
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center bg-yellow-400/50 animate-fadeIn">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
        )}
      </PuzzleStage>
    );
  }

  // Level 27: Smart home system
  if (levelId === 27) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-12">
            {/* Smart home device */}
            <div
              className={`w-40 h-40 rounded-3xl flex items-center justify-center text-8xl transition-all ${
                step >= 1 ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_40px_rgba(34,211,238,0.6)]' : 'bg-gray-300'
              }`}
              style={{
                boxShadow: step >= 1 ? '0 0 40px rgba(34,211,238,0.6)' : '0 8px 16px rgba(0,0,0,0.2)',
              }}
            >
              🏠
            </div>

            <div className="flex gap-8">
              {/* Plug button */}
              <button
                onClick={() => handleClick('plug')}
                className={`w-24 h-24 rounded-2xl flex items-center justify-center text-6xl transition-all transform hover:scale-110 active:scale-95 ${
                  step >= 1 ? 'bg-green-400' : 'bg-white'
                } ${feedback === 'wrong' ? 'animate-pulse' : ''}`}
                style={{
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}
              >
                🔌
              </button>

              {/* Power button */}
              <button
                onClick={() => handleClick('power')}
                className={`w-24 h-24 rounded-2xl flex items-center justify-center text-6xl transition-all transform hover:scale-110 active:scale-95 ${
                  step >= 1 ? 'bg-blue-400' : 'bg-gray-300'
                }`}
                style={{
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}
              >
                ⚡
              </button>
            </div>

            {step === 1 && (
              <div className="text-sm font-bold text-white bg-purple-600 px-4 py-2 rounded-full animate-fadeIn">
                Now press the power button! ⚡
              </div>
            )}
          </div>
        </div>
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center bg-cyan-400/50 animate-fadeIn">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
        )}
      </PuzzleStage>
    );
  }

  return null;
}
