import React from 'react';
import { Cell, Position, CELL_SYMBOLS } from '../types';

type GridProps = {
  grid: Cell[][];
  piPosition: Position;
  visionRange: number;
  exploredCells: Set<string>;
};

export function Grid({ grid, piPosition, visionRange, exploredCells }: GridProps) {
  const isCurrentlyVisible = (i: number, j: number): boolean => {
    const [piX, piY] = piPosition;
    const distance = Math.max(Math.abs(piX - i), Math.abs(piY - j));
    return distance <= visionRange;
  };

  const isExplored = (i: number, j: number): boolean => {
    return exploredCells.has(`${i},${j}`);
  };

  return (
    <div className="grid gap-2 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
      {grid.map((row, i) => (
        <div key={i} className="flex gap-2">
          {row.map((cell, j) => {
            const currentlyVisible = isCurrentlyVisible(i, j);
            const explored = isExplored(i, j);
            const isPi = i === piPosition[0] && j === piPosition[1];

            return (
              <div
                key={`${i}-${j}`}
                className={`w-16 h-16 flex items-center justify-center rounded-lg text-2xl
                  ${isPi
                    ? 'bg-yellow-100 animate-pulse'
                    : currentlyVisible
                    ? 'bg-white'
                    : explored
                    ? 'bg-gray-100'
                    : 'bg-gray-800'
                  } transition-all duration-300 transform hover:scale-105 shadow-sm`}
              >
                {currentlyVisible ? (
                  isPi ? CELL_SYMBOLS.pi : CELL_SYMBOLS[cell]
                ) : explored ? (
                  <span className="opacity-50">{CELL_SYMBOLS[cell]}</span>
                ) : (
                  '❓'
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}