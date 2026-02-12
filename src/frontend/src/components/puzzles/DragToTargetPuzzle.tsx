import { useState, useRef } from 'react';
import { PuzzleStage } from './PuzzleStage';

interface DragToTargetPuzzleProps {
  levelId: number;
  onSolved: () => void;
  onIncorrect: () => void;
}

export function DragToTargetPuzzle({ levelId, onSolved, onIncorrect }: DragToTargetPuzzleProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (feedback) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || feedback) return;
    setPosition({
      x: position.x + e.movementX,
      y: position.y + e.movementY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || feedback) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (dragRef.current && targetRef.current) {
      const dragRect = dragRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();

      const dragCenterX = dragRect.left + dragRect.width / 2;
      const dragCenterY = dragRect.top + dragRect.height / 2;

      const isOverTarget =
        dragCenterX >= targetRect.left &&
        dragCenterX <= targetRect.right &&
        dragCenterY >= targetRect.top &&
        dragCenterY <= targetRect.bottom;

      if (isOverTarget) {
        setFeedback('correct');
        setTimeout(() => {
          onSolved();
          setFeedback(null);
          setPosition({ x: 0, y: 0 });
        }, 800);
      } else {
        setFeedback('wrong');
        onIncorrect();
        setTimeout(() => {
          setFeedback(null);
          setPosition({ x: 0, y: 0 });
        }, 500);
      }
    }
  };

  const getLevelConfig = () => {
    const configs: Record<number, { draggable: string; target: string; targetPos: string }> = {
      2: { draggable: '🐝', target: '🌸', targetPos: 'top-10 right-10' }, // NEW: Bee to flower
      5: { draggable: '🍎', target: '🧺', targetPos: 'bottom-10 right-10' },
      8: { draggable: '🔑', target: '🔒', targetPos: 'top-1/2 right-10' },
      11: { draggable: '⭐', target: '🌙', targetPos: 'top-10 right-10' },
      14: { draggable: '🚗', target: '🏁', targetPos: 'bottom-10 right-10' },
      18: { draggable: '💾', target: '🤖', targetPos: 'top-1/2 right-10' },
      21: { draggable: '☕', target: '☕', targetPos: 'bottom-10 right-10' },
      24: { draggable: '🍾', target: '♻️', targetPos: 'bottom-10 right-10' },
      29: { draggable: '📄', target: '📁', targetPos: 'top-1/2 right-10' },
    };
    return configs[levelId] || configs[2];
  };

  const config = getLevelConfig();

  return (
    <PuzzleStage className="transition-smooth">
      <div className="absolute inset-0 p-8">
        {/* Draggable object */}
        <div
          ref={dragRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className={`absolute top-1/2 left-10 -translate-y-1/2 w-20 h-20 flex items-center justify-center text-6xl cursor-grab active:cursor-grabbing transition-all ${
            isDragging ? 'scale-110 z-10' : 'scale-100'
          } ${feedback === 'wrong' ? 'animate-pulse' : ''}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) translateY(-50%)`,
            touchAction: 'none',
          }}
        >
          {config.draggable}
        </div>

        {/* Target */}
        <div
          ref={targetRef}
          className={`absolute ${config.targetPos} w-24 h-24 flex items-center justify-center text-7xl rounded-3xl bg-white/50 border-4 border-dashed border-purple-400 transition-all`}
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {config.target}
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
