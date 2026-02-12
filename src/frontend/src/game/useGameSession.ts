import { useState, useCallback } from 'react';
import { puzzleLevels, PuzzleLevel } from './levels';

interface GameSession {
  currentLevelIndex: number;
  solvedLevels: number[];
  totalScore: number;
  isLevelComplete: boolean;
  isGameComplete: boolean;
  levelAttempts: number;
}

export function useGameSession() {
  const [session, setSession] = useState<GameSession>({
    currentLevelIndex: 0,
    solvedLevels: [],
    totalScore: 0,
    isLevelComplete: false,
    isGameComplete: false,
    levelAttempts: 0,
  });

  const currentLevel: PuzzleLevel = puzzleLevels[session.currentLevelIndex];

  const markLevelSolved = useCallback(() => {
    setSession((prev) => {
      const levelId = puzzleLevels[prev.currentLevelIndex].id;
      const alreadySolved = prev.solvedLevels.includes(levelId);
      const points = alreadySolved ? 0 : puzzleLevels[prev.currentLevelIndex].points;

      return {
        ...prev,
        solvedLevels: alreadySolved ? prev.solvedLevels : [...prev.solvedLevels, levelId],
        totalScore: prev.totalScore + points,
        isLevelComplete: true,
        levelAttempts: 0,
      };
    });
  }, []);

  const incrementAttempts = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      levelAttempts: prev.levelAttempts + 1,
    }));
  }, []);

  const nextLevel = useCallback(() => {
    setSession((prev) => {
      const nextIndex = prev.currentLevelIndex + 1;
      const isComplete = nextIndex >= puzzleLevels.length;

      return {
        ...prev,
        currentLevelIndex: isComplete ? prev.currentLevelIndex : nextIndex,
        isLevelComplete: false,
        isGameComplete: isComplete,
        levelAttempts: 0,
      };
    });
  }, []);

  const restartLevel = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      isLevelComplete: false,
      levelAttempts: 0,
    }));
  }, []);

  const restartGame = useCallback(() => {
    setSession({
      currentLevelIndex: 0,
      solvedLevels: [],
      totalScore: 0,
      isLevelComplete: false,
      isGameComplete: false,
      levelAttempts: 0,
    });
  }, []);

  const jumpToLevel = useCallback((levelIndex: number) => {
    setSession((prev) => ({
      ...prev,
      currentLevelIndex: levelIndex,
      isLevelComplete: false,
      isGameComplete: false,
      levelAttempts: 0,
    }));
  }, []);

  const getScoreForSubmission = useCallback(() => {
    return BigInt(session.totalScore);
  }, [session.totalScore]);

  return {
    session,
    currentLevel,
    markLevelSolved,
    incrementAttempts,
    nextLevel,
    restartLevel,
    restartGame,
    jumpToLevel,
    getScoreForSubmission,
  };
}
