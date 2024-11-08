import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from './components/Grid';
import { StatusBar } from './components/StatusBar';
import { RewardModal } from './components/RewardModal';
import { GameOverModal } from './components/GameOverModal';
import { MainMenu } from './components/MainMenu';
import { Instructions } from './components/Instructions';
import { StatsBoard } from './components/StatsBoard';
import { useGameStats } from './hooks/useGameStats';
import { AVAILABLE_BUFFS } from './buffs';
import { Cell, Position, GameState, GameScreen } from './types';

const GRID_SIZE = 5;
const INITIAL_HEALTH = 100;
const MAX_WATER_CELLS = 5;

function App() {
  const [screen, setScreen] = useState<GameScreen>('menu');
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [piPosition, setPiPosition] = useState<Position>([0, 0]);
  const [steps, setSteps] = useState(0);
  const [generation, setGeneration] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [waterCollected, setWaterCollected] = useState(0);
  const { stats, updateStats } = useGameStats();
  
  const [gameState, setGameState] = useState<GameState>({
    health: INITIAL_HEALTH,
    maxHealth: INITIAL_HEALTH,
    fireResistance: 0,
    poisonResistance: 0,
    visionRange: 1,
    score: 0,
    highScore: 0,
    exploredCells: new Set<string>(),
  });

  const initializeGrid = useCallback(() => {
    const newGrid: Cell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill('empty')
    );

    let waterCount = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (Math.random() < 0.4 && waterCount < MAX_WATER_CELLS) {
          newGrid[i][j] = 'water';
          waterCount++;
        } else if (Math.random() < 0.3) {
          newGrid[i][j] = Math.random() < 0.5 ? 'fire' : 'poison';
        }
      }
    }

    return newGrid;
  }, []);

  const reset = useCallback(() => {
    const newGrid = initializeGrid();
    setPiPosition([0, 0]);
    setGrid(newGrid);
    setSteps(0);
    setGeneration(1);
    setIsGameOver(false);
    setIsPaused(false);
    setShowRewards(false);
    setWaterCollected(0);
    setGameState({
      health: INITIAL_HEALTH,
      maxHealth: INITIAL_HEALTH,
      fireResistance: 0,
      poisonResistance: 0,
      visionRange: 1,
      score: 0,
      highScore: stats.highestScore,
      exploredCells: new Set(),
    });
  }, [stats.highestScore]);

  const handleBuffSelection = (buff: typeof AVAILABLE_BUFFS[number]) => {
    setGameState(buff.apply);
    setShowRewards(false);
    const newGrid = initializeGrid();
    setGrid(newGrid);
    setGeneration(g => g + 1);
  };

  const movePI = useCallback(() => {
    if (isGameOver || isPaused) return;

    const [x, y] = piPosition;
    const moves: Position[] = [
      [x - 1, y], // up
      [x + 1, y], // down
      [x, y - 1], // left
      [x, y + 1], // right
    ].filter(([newX, newY]) => 
      newX >= 0 && newX < GRID_SIZE && 
      newY >= 0 && newY < GRID_SIZE
    );

    // Add current position to explored cells
    setGameState(prev => ({
      ...prev,
      exploredCells: new Set([...prev.exploredCells, `${x},${y}`])
    }));

    // Prioritize water cells
    const waterMove = moves.find(([newX, newY]) => grid[newX][newY] === 'water');
    const nextMove = waterMove || moves[Math.floor(Math.random() * moves.length)];

    if (nextMove) {
      const [newX, newY] = nextMove;
      const cell = grid[newX][newY];

      // Update health based on cell type
      setGameState(prev => {
        let health = prev.health;
        let score = prev.score;

        if (cell === 'water') {
          health = Math.min(prev.maxHealth, health + 20);
          score += 100;
          setWaterCollected(w => w + 1);
          const newGrid = [...grid];
          newGrid[newX][newY] = 'empty';
          setGrid(newGrid);
        } else if (cell === 'fire') {
          const damage = Math.floor(30 * (1 - prev.fireResistance / 100));
          health -= damage;
          score -= 20;
        } else if (cell === 'poison') {
          const damage = Math.floor(50 * (1 - prev.poisonResistance / 100));
          health -= damage;
          score -= 30;
        }

        score += 5; // Points for surviving a step
        const highScore = Math.max(prev.highScore, score);

        if (health <= 0) {
          setIsGameOver(true);
        }

        return {
          ...prev,
          health,
          score,
          highScore,
        };
      });

      setPiPosition([newX, newY]);
      setSteps(s => s + 1);

      // Check if all water is collected
      const remainingWater = grid.flat().filter(cell => cell === 'water').length === 0;
      if (remainingWater) {
        setShowRewards(true);
      }
    }
  }, [grid, piPosition, isGameOver, isPaused]);

  useEffect(() => {
    if (screen === 'game') {
      reset();
    }
  }, [screen, reset]);

  useEffect(() => {
    if (screen === 'game' && !showRewards && !isGameOver) {
      const interval = setInterval(movePI, 1000);
      return () => clearInterval(interval);
    }
  }, [movePI, screen, showRewards, isGameOver]);

  if (screen === 'menu') {
    return (
      <MainMenu
        onStartGame={() => setScreen('game')}
        onShowInstructions={() => setScreen('instructions')}
        onShowStats={() => setScreen('stats')}
      />
    );
  }

  if (screen === 'instructions') {
    return <Instructions onBack={() => setScreen('menu')} />;
  }

  if (screen === 'stats') {
    return <StatsBoard stats={stats} onBack={() => setScreen('menu')} />;
  }

  return (
    <div className="min-h-screen bg-[#235ADC] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#0054E3] to-[#2989d8] p-4 flex justify-between items-center">
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-white">PI's Adventure</h1>
              <p className="text-blue-100">Generation {generation}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setScreen('menu')}
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors"
              >
                Menu
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded transition-colors"
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>

          <div className="p-8 bg-[#ECE9D8] space-y-6">
            <StatusBar
              gameState={gameState}
              steps={steps}
              waterLeft={grid.flat().filter(cell => cell === 'water').length}
            />

            <Grid
              grid={grid}
              piPosition={piPosition}
              visionRange={gameState.visionRange}
              exploredCells={gameState.exploredCells}
            />
          </div>
        </div>
      </div>

      {isGameOver && (
        <GameOverModal
          score={gameState.score}
          highScore={gameState.highScore}
          onReset={() => {
            updateStats(gameState.score, steps, waterCollected);
            reset();
          }}
        />
      )}

      {showRewards && (
        <RewardModal
          buffs={AVAILABLE_BUFFS}
          onSelect={handleBuffSelection}
        />
      )}
    </div>
  );
}

export default App;