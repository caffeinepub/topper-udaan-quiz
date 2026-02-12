import { ReactNode, useEffect, useState } from 'react';

interface ScreenTransitionProps {
  children: ReactNode;
  transitionKey: string;
  className?: string;
}

export function ScreenTransition({ children, transitionKey, className = '' }: ScreenTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reset visibility on key change
    setIsVisible(false);
    
    // Trigger entrance animation after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [transitionKey]);

  return (
    <div
      className={`transition-opacity duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}
