import { ReactNode } from 'react';

interface PuzzleStageProps {
  children: ReactNode;
  className?: string;
}

export function PuzzleStage({ children, className = '' }: PuzzleStageProps) {
  return (
    <div
      className={`relative w-full aspect-square max-w-md mx-auto bg-gradient-to-br from-sky-200 to-sky-100 rounded-3xl shadow-lg overflow-hidden touch-none transition-smooth ${className}`}
      style={{
        backgroundImage: 'url(/assets/generated/puzzle-bg.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </div>
  );
}
