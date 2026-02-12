import { useState } from 'react';
import { PuzzleStage } from './PuzzleStage';

interface TapTrickPuzzleProps {
  levelId: number;
  onSolved: () => void;
  onIncorrect: () => void;
}

export function TapTrickPuzzle({ levelId, onSolved, onIncorrect }: TapTrickPuzzleProps) {
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleBalloonClick = (balloonIndex: number) => {
    if (feedback) return;

    let isCorrect = false;

    // Level 1: NEW - Count circles (3 circles shown)
    if (levelId === 1) {
      isCorrect = balloonIndex === 0; // "3" button
    }
    // Level 4: Hidden star in corner
    else if (levelId === 4) {
      isCorrect = balloonIndex === 4;
    }
    // Level 7: Tap the sun (index 2)
    else if (levelId === 7) {
      isCorrect = balloonIndex === 2;
    }
    // Level 10: Tap the smallest emoji (index 3)
    else if (levelId === 10) {
      isCorrect = balloonIndex === 3;
    }
    // Level 13: Tap the odd one out (index 1)
    else if (levelId === 13) {
      isCorrect = balloonIndex === 1;
    }
    // Level 16: AI Vision - tap the glowing node (index 2)
    else if (levelId === 16) {
      isCorrect = balloonIndex === 2;
    }
    // Level 19: Morning Routine - tap toothbrush (index 0)
    else if (levelId === 19) {
      isCorrect = balloonIndex === 0;
    }
    // Level 22: Traffic Light - tap green light (index 2)
    else if (levelId === 22) {
      isCorrect = balloonIndex === 2;
    }
    // Level 25: Phone Battery - tap charger (index 1)
    else if (levelId === 25) {
      isCorrect = balloonIndex === 1;
    }
    // Level 28: Email Inbox - tap starred email (index 1)
    else if (levelId === 28) {
      isCorrect = balloonIndex === 1;
    }

    if (isCorrect) {
      setFeedback('correct');
      setTimeout(() => {
        onSolved();
        setFeedback(null);
      }, 800);
    } else {
      setFeedback('wrong');
      onIncorrect();
      setTimeout(() => setFeedback(null), 500);
    }
  };

  // Level 1: NEW - Count the circles
  if (levelId === 1) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 gap-8">
          {/* Display circles */}
          <div className="flex gap-6">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg animate-float"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ))}
          </div>
          
          {/* Number buttons */}
          <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
            {[3, 2, 4].map((num, index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className={`aspect-square rounded-2xl font-bold text-4xl transition-all transform hover:scale-110 active:scale-95 ${
                  feedback === 'wrong' ? 'animate-pulse' : ''
                } ${feedback === 'correct' && index === 0 ? 'bg-green-400' : 'bg-white'}`}
                style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-400/50 animate-fadeIn">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
        )}
      </PuzzleStage>
    );
  }

  if (levelId === 4) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 p-8">
          <div className="relative w-full h-full">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className="absolute w-16 h-16 text-4xl transition-all hover:scale-110 active:scale-95"
                style={{
                  top: `${[20, 60, 30, 70][index]}%`,
                  left: `${[30, 70, 60, 20][index]}%`,
                }}
              >
                {['🌙', '☁️', '🌞', '🌟'][index]}
              </button>
            ))}
            <button
              onClick={() => handleBalloonClick(4)}
              className="absolute top-2 right-2 w-8 h-8 text-2xl opacity-30 hover:opacity-100 transition-all"
            >
              ⭐
            </button>
          </div>
        </div>
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center bg-yellow-400/50 animate-fadeIn">
            <div className="text-6xl animate-bounce">🌟</div>
          </div>
        )}
      </PuzzleStage>
    );
  }

  if (levelId === 7) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="grid grid-cols-3 gap-6 w-full max-w-md">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className={`aspect-square rounded-3xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center text-6xl ${
                  feedback === 'wrong' ? 'animate-pulse' : ''
                }`}
                style={{
                  background: ['#4A90E2', '#E94B3C', '#F5A623'][index],
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}
              >
                {['🌙', '⭐', '☀️'][index]}
              </button>
            ))}
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

  if (levelId === 10) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className={`aspect-square rounded-3xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center bg-white ${
                  feedback === 'wrong' ? 'animate-pulse' : ''
                }`}
                style={{
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  fontSize: `${[80, 90, 85, 40][index]}px`,
                }}
              >
                {['🐘', '🦒', '🦁', '🐜'][index]}
              </button>
            ))}
          </div>
        </div>
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-400/50 animate-fadeIn">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
        )}
      </PuzzleStage>
    );
  }

  if (levelId === 13) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className={`aspect-square rounded-3xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center text-7xl ${
                  feedback === 'wrong' ? 'animate-pulse' : ''
                }`}
                style={{
                  background: ['#FF6B9D', '#4A90E2', '#FF6B9D', '#FF6B9D'][index],
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}
              >
                {['🍎', '🍌', '🍎', '🍎'][index]}
              </button>
            ))}
          </div>
        </div>
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-400/50 animate-fadeIn">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
        )}
      </PuzzleStage>
    );
  }

  if (levelId === 16) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className={`aspect-square rounded-2xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center text-4xl ${
                  feedback === 'wrong' ? 'animate-pulse' : ''
                } ${index === 2 ? 'bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.8)]' : 'bg-purple-200'}`}
                style={{
                  boxShadow: index === 2 ? '0 0 30px rgba(34,211,238,0.8)' : '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                {index === 2 ? '⚡' : '🔵'}
              </button>
            ))}
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

  if (levelId === 19) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="grid grid-cols-3 gap-6 w-full max-w-md">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className={`aspect-square rounded-3xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center text-6xl bg-white ${
                  feedback === 'wrong' ? 'animate-pulse' : ''
                }`}
                style={{
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}
              >
                {['🪥', '🪮', '👟'][index]}
              </button>
            ))}
          </div>
        </div>
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-400/50 animate-fadeIn">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
        )}
      </PuzzleStage>
    );
  }

  if (levelId === 22) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="flex flex-col gap-4 w-full max-w-xs">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className={`h-24 rounded-3xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center text-5xl ${
                  feedback === 'wrong' ? 'animate-pulse' : ''
                }`}
                style={{
                  background: ['#E94B3C', '#F5A623', '#6BCB77'][index],
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}
              >
                {['🔴', '🟡', '🟢'][index]}
              </button>
            ))}
          </div>
        </div>
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-400/50 animate-fadeIn">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
        )}
      </PuzzleStage>
    );
  }

  if (levelId === 25) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className={`aspect-square rounded-3xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center text-7xl bg-white ${
                  feedback === 'wrong' ? 'animate-pulse' : ''
                }`}
                style={{
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                }}
              >
                {['📱', '🔌'][index]}
              </button>
            ))}
          </div>
        </div>
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-400/50 animate-fadeIn">
            <div className="text-6xl animate-bounce">✨</div>
          </div>
        )}
      </PuzzleStage>
    );
  }

  if (levelId === 28) {
    return (
      <PuzzleStage className="transition-smooth">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="flex flex-col gap-4 w-full max-w-md">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => handleBalloonClick(index)}
                className={`h-20 rounded-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-between px-6 bg-white ${
                  feedback === 'wrong' ? 'animate-pulse' : ''
                }`}
                style={{
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              >
                <span className="text-2xl">{['📧', '⭐📧', '📧'][index]}</span>
                <span className="text-sm font-medium text-gray-600">
                  {['Normal Email', 'Important!', 'Old Email'][index]}
                </span>
              </button>
            ))}
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

  return null;
}
