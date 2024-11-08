import React from 'react';

type GameOverModalProps = {
  score: number;
  highScore: number;
  onReset: () => void;
};

export function GameOverModal({ score, highScore, onReset }: GameOverModalProps) {
  const isNewHighScore = score > highScore;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Game Over!</h2>
        
        <div className="space-y-4 mb-6">
          <div className="text-center">
            <p className="text-gray-600">Score</p>
            <p className="text-4xl font-bold text-indigo-600">{score}</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600">High Score</p>
            <p className="text-2xl font-bold text-purple-600">{highScore}</p>
          </div>

          {isNewHighScore && (
            <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-center animate-bounce">
              🎉 New High Score! 🎉
            </div>
          )}
        </div>

        <button
          onClick={onReset}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}