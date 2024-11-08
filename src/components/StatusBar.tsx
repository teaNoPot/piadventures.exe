import React from 'react';
import { Heart, Timer, Droplets, Shield, Trophy } from 'lucide-react';
import { GameState } from '../types';

type StatusBarProps = {
  gameState: GameState;
  steps: number;
  waterLeft: number;
};

export function StatusBar({ gameState, steps, waterLeft }: StatusBarProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <Heart className="text-red-500" />
        <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-300"
            style={{ width: `${(gameState.health / gameState.maxHealth) * 100}%` }}
          />
        </div>
        <span className="text-gray-700 font-medium">
          {gameState.health}/{gameState.maxHealth}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Shield className="text-orange-500" />
        <span className="text-gray-700 font-medium">
          🔥 {gameState.fireResistance}%
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Shield className="text-green-500" />
        <span className="text-gray-700 font-medium">
          ☠️ {gameState.poisonResistance}%
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Timer className="text-blue-500" />
        <span className="text-gray-700 font-medium">{steps} steps</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Droplets className="text-blue-500" />
        <span className="text-gray-700 font-medium">
          {waterLeft} water left
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Trophy className="text-yellow-500" />
        <span className="text-gray-700 font-medium">
          Score: {gameState.score}
        </span>
      </div>
    </div>
  );
}