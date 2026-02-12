import { useState, useEffect } from 'react';
import { GameShell } from './components/GameShell';
import { LevelCompletePanel } from './components/LevelCompletePanel';
import { LeaderboardPanel } from './components/LeaderboardPanel';
import { Dashboard } from './components/Dashboard';
import { HintPanel } from './components/HintPanel';
import { FailSafeChoices } from './components/FailSafeChoices';
import { ScreenTransition } from './components/ScreenTransition';
import { DiamondNotification } from './components/DiamondNotification';
import { TapTrickPuzzle } from './components/puzzles/TapTrickPuzzle';
import { DragToTargetPuzzle } from './components/puzzles/DragToTargetPuzzle';
import { MultiStepSequencePuzzle } from './components/puzzles/MultiStepSequencePuzzle';
import { TextRiddlePuzzle } from './components/puzzles/TextRiddlePuzzle';
import { useGameSession } from './game/useGameSession';
import { puzzleLevels } from './game/levels';
import { useLeaderboard } from './hooks/useQueries';
import { useSubmitScore } from './hooks/useQueries';
import { useSound } from './hooks/useSound';
import { triggerCelebration, triggerLevelCompleteCelebration } from './lib/celebration';
import { generateUID, calculateRank } from './lib/rewards';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';

type AppScreen = 'start' | 'dashboard' | 'playing' | 'level-complete' | 'game-complete';

interface RewardPayload {
  uid: string;
  diamonds: number;
  rank?: number;
}

function App() {
  const {
    session,
    currentLevel,
    markLevelSolved,
    incrementAttempts,
    nextLevel,
    restartLevel,
    restartGame,
    jumpToLevel,
    getScoreForSubmission,
  } = useGameSession();

  const { data: leaderboard, isLoading: leaderboardLoading } = useLeaderboard();
  const { mutate: submitScore } = useSubmitScore();
  const { playSound } = useSound();

  const [screen, setScreen] = useState<AppScreen>('start');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [hasSubmittedScore, setHasSubmittedScore] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [rewardPayload, setRewardPayload] = useState<RewardPayload | null>(null);
  const [hasShownNotification, setHasShownNotification] = useState(false);

  const handlePuzzleSolved = () => {
    markLevelSolved();
    playSound('success');
    triggerLevelCompleteCelebration();
    setShowHint(false);
  };

  const handlePuzzleIncorrect = () => {
    incrementAttempts();
    playSound('fail');
  };

  const handleFailSafeCorrect = () => {
    markLevelSolved();
    playSound('success');
    triggerLevelCompleteCelebration();
    setShowHint(false);
  };

  const handleFailSafeIncorrect = () => {
    incrementAttempts();
    playSound('fail');
  };

  const handleNextLevel = () => {
    nextLevel();
    setShowHint(false);
    if (session.currentLevelIndex + 1 >= puzzleLevels.length) {
      playSound('gameComplete');
      triggerCelebration();
      setScreen('game-complete');
    } else {
      setScreen('playing');
    }
  };

  const handleStartGame = () => {
    if (playerName.trim() === '') {
      alert('Please enter your name!');
      return;
    }
    setScreen('dashboard');
  };

  const handleStartFromDashboard = () => {
    setScreen('playing');
    setShowHint(false);
  };

  const handleSelectLevel = (levelIndex: number) => {
    jumpToLevel(levelIndex);
    setScreen('playing');
    setShowHint(false);
  };

  const handleRestartGame = () => {
    restartGame();
    setHasSubmittedScore(false);
    setRewardPayload(null);
    setHasShownNotification(false);
    setScreen('start');
    setPlayerName('');
    setShowHint(false);
  };

  const handleBackToDashboard = () => {
    setScreen('dashboard');
    setShowHint(false);
  };

  const handleRestartLevel = () => {
    restartLevel();
    setShowHint(false);
  };

  const handleToggleHint = () => {
    setShowHint(!showHint);
  };

  // Submit score when game is complete
  useEffect(() => {
    if (screen === 'game-complete' && !hasSubmittedScore && playerName) {
      const score = getScoreForSubmission();
      submitScore({ name: playerName, score });
      setHasSubmittedScore(true);
    }
  }, [screen, hasSubmittedScore, playerName, submitScore, getScoreForSubmission]);

  // Generate reward payload when entering game-complete screen for the first time
  useEffect(() => {
    if (screen === 'game-complete' && !rewardPayload && hasSubmittedScore) {
      const uid = generateUID();
      const diamonds = 1000;
      
      // Calculate rank from leaderboard after submission
      const score = getScoreForSubmission();
      const rank = calculateRank(score, leaderboard);

      setRewardPayload({
        uid,
        diamonds,
        rank,
      });
      setHasShownNotification(false);
    }
  }, [screen, rewardPayload, hasSubmittedScore, leaderboard, getScoreForSubmission]);

  // Update screen based on session state
  useEffect(() => {
    if (session.isGameComplete && screen === 'playing') {
      setScreen('game-complete');
    } else if (session.isLevelComplete && screen === 'playing') {
      setScreen('level-complete');
    }
  }, [session.isGameComplete, session.isLevelComplete, screen]);

  // Start screen
  if (screen === 'start') {
    return (
      <ScreenTransition transitionKey="start">
        <div
          className="min-h-screen flex items-center justify-center p-4 relative"
          style={{
            background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <Card className="w-full max-w-md border-none shadow-2xl bg-white/95 backdrop-blur-sm animate-scaleIn">
            <CardHeader className="text-center pb-4">
              <div className="mb-4">
                <img
                  src="/assets/generated/mascot.dim_512x512.png"
                  alt="Game Mascot"
                  className="w-32 h-32 mx-auto rounded-full border-8 border-purple-200 shadow-xl transition-smooth hover:scale-105"
                />
              </div>
              <CardTitle className="text-4xl font-bold text-purple-600 mb-2">
                Brain Puzzle
              </CardTitle>
              <p className="text-gray-600 font-medium">Challenge your mind!</p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div
                className="rounded-2xl p-6 space-y-2 relative overflow-hidden transition-smooth"
                style={{
                  backgroundImage: 'url(/assets/generated/gaming-panel.dim_1024x512.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="relative z-10">
                  <p className="text-center text-white font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    🧩 Solve tricky puzzles
                  </p>
                  <p className="text-center text-white font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    🎯 Drag, tap, and think!
                  </p>
                  <p className="text-center text-white font-bold text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    ⭐ Earn points & compete
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Enter Your Name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStartGame()}
                  className="h-14 text-lg rounded-full border-4 border-purple-200 focus:border-purple-400 bg-white transition-smooth"
                />
                <Button
                  onClick={handleStartGame}
                  className="w-full h-16 text-xl font-bold rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-purple-900 shadow-lg transition-smooth"
                >
                  Start Playing! 🚀
                </Button>
              </div>
            </CardContent>
          </Card>

          <footer className="absolute bottom-4 text-center text-sm text-white/80">
            <p>
              © {new Date().getFullYear()} Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'brain-puzzle'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:text-yellow-200 transition-colors font-semibold"
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </div>
      </ScreenTransition>
    );
  }

  // Dashboard screen
  if (screen === 'dashboard') {
    return (
      <ScreenTransition transitionKey="dashboard">
        <div
          className="min-h-screen p-4 relative"
          style={{
            background: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #FFF8DC 100%)',
          }}
        >
          <Dashboard
            playerName={playerName}
            currentProgress={session.solvedLevels}
            totalScore={session.totalScore}
            onStartContinue={handleStartFromDashboard}
            onSelectLevel={handleSelectLevel}
            onShowLeaderboard={() => setShowLeaderboard(true)}
            rewardPayload={rewardPayload}
          />

          {showLeaderboard && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className="w-full max-w-md relative animate-scaleIn">
                <Button
                  onClick={() => setShowLeaderboard(false)}
                  size="icon"
                  className="absolute -top-4 -right-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-lg h-12 w-12 z-10 transition-smooth"
                >
                  <X className="h-6 w-6" />
                </Button>
                <LeaderboardPanel leaderboard={leaderboard} isLoading={leaderboardLoading} />
              </div>
            </div>
          )}

          <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-600">
            <p>
              © {new Date().getFullYear()} Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'brain-puzzle'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 transition-colors font-semibold"
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </div>
      </ScreenTransition>
    );
  }

  // Game complete screen
  if (screen === 'game-complete') {
    return (
      <ScreenTransition transitionKey="game-complete">
        <div
          className="min-h-screen flex items-center justify-center p-4 relative"
          style={{
            background: 'linear-gradient(180deg, #f093fb 0%, #f5576c 100%)',
          }}
        >
          {/* Diamond Notification Overlay */}
          {rewardPayload && !hasShownNotification && (
            <DiamondNotification
              playerName={playerName}
              diamonds={rewardPayload.diamonds}
              uid={rewardPayload.uid}
              rank={rewardPayload.rank}
            />
          )}

          <div className="w-full max-w-md space-y-6">
            <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm animate-scaleIn">
              <CardHeader className="text-center pb-4">
                <div className="text-8xl mb-4 animate-bounce">🏆</div>
                <CardTitle className="text-4xl font-bold text-purple-600 mb-2">
                  Congratulations!
                </CardTitle>
                <p className="text-gray-600 font-medium text-lg">
                  You completed all puzzles!
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium text-lg">Final Score</span>
                    <span className="text-purple-600 font-bold text-3xl">
                      {session.totalScore} ⭐
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Levels Solved</span>
                    <span className="text-purple-600 font-bold text-xl">
                      {session.solvedLevels.length}/{puzzleLevels.length}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleRestartGame}
                  className="w-full h-14 text-lg font-bold rounded-full bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white shadow-lg transition-smooth"
                >
                  Play Again 🔄
                </Button>

                <Button
                  onClick={() => setShowLeaderboard(true)}
                  variant="outline"
                  className="w-full h-14 text-lg font-bold rounded-full border-4 border-purple-200 hover:bg-purple-50 transition-smooth"
                >
                  View Leaderboard 🏆
                </Button>
              </CardContent>
            </Card>
          </div>

          {showLeaderboard && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className="w-full max-w-md relative animate-scaleIn">
                <Button
                  onClick={() => setShowLeaderboard(false)}
                  size="icon"
                  className="absolute -top-4 -right-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-lg h-12 w-12 z-10 transition-smooth"
                >
                  <X className="h-6 w-6" />
                </Button>
                <LeaderboardPanel leaderboard={leaderboard} isLoading={leaderboardLoading} />
              </div>
            </div>
          )}

          <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/80">
            <p>
              © {new Date().getFullYear()} Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'brain-puzzle'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 hover:text-yellow-200 transition-colors font-semibold"
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </div>
      </ScreenTransition>
    );
  }

  // Level complete screen
  if (screen === 'level-complete') {
    return (
      <ScreenTransition transitionKey={`level-complete-${session.currentLevelIndex}`}>
        <div
          className="min-h-screen flex items-center justify-center p-4 relative"
          style={{
            background: 'linear-gradient(180deg, #a8edea 0%, #fed6e3 100%)',
          }}
        >
          <LevelCompletePanel
            levelNumber={currentLevel?.id || 0}
            pointsEarned={currentLevel?.points || 0}
            totalScore={session.totalScore}
            isLastLevel={session.currentLevelIndex === puzzleLevels.length - 1}
            onNext={handleNextLevel}
            onReplay={handleRestartLevel}
            onBackToDashboard={handleBackToDashboard}
          />

          <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-600">
            <p>
              © {new Date().getFullYear()} Built with ❤️ using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'brain-puzzle'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 transition-colors font-semibold"
              >
                caffeine.ai
              </a>
            </p>
          </footer>
        </div>
      </ScreenTransition>
    );
  }

  // Playing screen
  if (!currentLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <ScreenTransition transitionKey={`playing-${session.currentLevelIndex}`}>
      <GameShell
        currentLevel={session.currentLevelIndex + 1}
        totalLevels={puzzleLevels.length}
        score={session.totalScore}
        difficulty={currentLevel.difficulty}
        onShowLeaderboard={() => setShowLeaderboard(true)}
        onBackToDashboard={handleBackToDashboard}
      >
        <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6 w-full animate-slideUp">
          {/* Instruction Panel */}
          <div className="w-full max-w-2xl">
            <div
              className="rounded-3xl p-6 relative overflow-hidden transition-smooth"
              style={{
                backgroundImage: 'url(/assets/generated/instruction-panel.dim_1024x512.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center text-puzzle-instruction">
                {currentLevel.instruction}
              </h2>
            </div>
          </div>

          {/* Puzzle Component */}
          <div className="w-full max-w-2xl">
            {currentLevel.type === 'tap-trick' && (
              <TapTrickPuzzle
                levelId={currentLevel.id}
                onSolved={handlePuzzleSolved}
                onIncorrect={handlePuzzleIncorrect}
              />
            )}
            {currentLevel.type === 'drag-target' && (
              <DragToTargetPuzzle
                levelId={currentLevel.id}
                onSolved={handlePuzzleSolved}
                onIncorrect={handlePuzzleIncorrect}
              />
            )}
            {currentLevel.type === 'multi-step' && (
              <MultiStepSequencePuzzle
                levelId={currentLevel.id}
                onSolved={handlePuzzleSolved}
                onIncorrect={handlePuzzleIncorrect}
              />
            )}
            {currentLevel.type === 'riddle' && (
              <TextRiddlePuzzle
                levelId={currentLevel.id}
                onSolved={handlePuzzleSolved}
                onIncorrect={handlePuzzleIncorrect}
              />
            )}
          </div>

          {/* Hint Panel */}
          {currentLevel.hint && (
            <div className="w-full max-w-2xl">
              <HintPanel 
                hint={currentLevel.hint} 
                isVisible={showHint}
                onToggle={handleToggleHint}
              />
            </div>
          )}

          {/* Fail-Safe Choices */}
          {currentLevel.failSafeChoices &&
            session.levelAttempts[currentLevel.id] >= 3 && (
              <div className="w-full max-w-2xl">
                <FailSafeChoices
                  choices={currentLevel.failSafeChoices}
                  onCorrect={handleFailSafeCorrect}
                  onIncorrect={handleFailSafeIncorrect}
                />
              </div>
            )}
        </div>
      </GameShell>

      {showLeaderboard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="w-full max-w-md relative animate-scaleIn">
            <Button
              onClick={() => setShowLeaderboard(false)}
              size="icon"
              className="absolute -top-4 -right-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-lg h-12 w-12 z-10 transition-smooth"
            >
              <X className="h-6 w-6" />
            </Button>
            <LeaderboardPanel leaderboard={leaderboard} isLoading={leaderboardLoading} />
          </div>
        </div>
      )}
    </ScreenTransition>
  );
}

export default App;
