/**
 * Utility functions for the diamond reward system
 */

import type { LeaderboardEntry } from '../backend';

/**
 * Generate a unique UID in the format UID-XXXXXX (6 digits)
 */
export function generateUID(): string {
  const randomSixDigits = Math.floor(100000 + Math.random() * 900000);
  return `UID-${randomSixDigits}`;
}

/**
 * Format diamonds with English thousands separators
 */
export function formatDiamonds(diamonds: number): string {
  return new Intl.NumberFormat('en-US').format(diamonds);
}

/**
 * Calculate player rank from leaderboard data
 * Returns 1-based rank if player's score is found in the leaderboard, otherwise undefined
 */
export function calculateRank(
  playerScore: bigint,
  leaderboard: LeaderboardEntry[] | undefined
): number | undefined {
  if (!leaderboard || leaderboard.length === 0) {
    return undefined;
  }

  const rankIndex = leaderboard.findIndex((entry) => entry.score === playerScore);
  
  if (rankIndex === -1) {
    return undefined;
  }

  return rankIndex + 1;
}
