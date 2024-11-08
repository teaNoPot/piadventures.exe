import { useEffect, useState } from 'react';
import { GameStats } from '../types';

const STATS_KEY = 'pi_adventure_stats';

const DEFAULT_STATS: GameStats = {
  totalGames: 0,
  highestScore: 0,
  longestSurvival: 0,
  totalWaterCollected: 0,
  mostWaterInGame: 0,
  lastPlayed: new Date().toISOString(),
};

export function useGameStats() {
  const [stats, setStats] = useState<GameStats>(() => {
    const saved = localStorage.getItem(STATS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_STATS;
  });

  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  const updateStats = (score: number, steps: number, waterCollected: number) => {
    setStats(current => ({
      totalGames: current.totalGames + 1,
      highestScore: Math.max(current.highestScore, score),
      longestSurvival: Math.max(current.longestSurvival, steps),
      totalWaterCollected: current.totalWaterCollected + waterCollected,
      mostWaterInGame: Math.max(current.mostWaterInGame, waterCollected),
      lastPlayed: new Date().toISOString(),
    }));
  };

  return { stats, updateStats };
}