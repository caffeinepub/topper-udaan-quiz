# Specification

## Summary
**Goal:** Add a one-time diamond reward (with generated UID) that triggers only on final game completion (Level 30), shown via a floating notification, and surfaced later on the Dashboard as a reward card.

**Planned changes:**
- Detect completion of the final level (Level 30 / last item in `puzzleLevels`) and, on first entry to the game-complete state, generate and store a session-only reward payload: `uid` formatted as `UID-` + 6 digits and `diamonds` (minimum 1000).
- Clear the stored reward payload when the user restarts the game via the existing restart / Play Again flow.
- Add a `DiamondNotification` overlay that auto-shows upon reaching the game-complete screen, displays playerName, diamonds (with thousands separators), UID, and optional rank (only when available), and auto-hides after ~5 seconds without repeating while staying on the game-complete screen.
- Add a `DashboardDiamond` reward card to the Dashboard that appears only after full game completion when a reward payload exists, showing playerName, diamonds, UID, and optional rank (only when available).
- Populate the optional rank without randomization: if the player’s submitted score appears in the fetched leaderboard list, set rank to that 1-based position; otherwise omit rank, while keeping existing leaderboard submission/refetch behavior unchanged.

**User-visible outcome:** After completing Level 30, the player sees a temporary floating diamond reward popup showing their UID and diamonds; when returning to the Dashboard, they see a reward card with the same details (and rank only when determinable).
