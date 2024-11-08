export type Cell = 'empty' | 'fire' | 'water' | 'poison' | 'pi';
export type Position = [number, number];

export type Buff = {
  name: string;
  description: string;
  icon: string;
  apply: (current: GameState) => GameState;
};

export type GameState = {
  health: number;
  fireResistance: number;
  poisonResistance: number;
  visionRange: number;
  maxHealth: number;
  score: number;
  highScore: number;
  exploredCells: Set<string>;
};

export type GameStats = {
  totalGames: number;
  highestScore: number;
  longestSurvival: number;
  totalWaterCollected: number;
  mostWaterInGame: number;
  lastPlayed: string;
};

export type GameScreen = 'menu' | 'game' | 'instructions' | 'stats';

export const CELL_SYMBOLS: Record<Cell, string> = {
  empty: '🌱',
  fire: '🔥',
  water: '💧',
  poison: '☠️',
  pi: '🤖',
};