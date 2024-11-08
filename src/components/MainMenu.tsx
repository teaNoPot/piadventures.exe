import React from 'react';
import { Monitor } from 'lucide-react';

type MainMenuProps = {
  onStartGame: () => void;
  onShowInstructions: () => void;
  onShowStats: () => void;
};

export function MainMenu({ onStartGame, onShowInstructions, onShowStats }: MainMenuProps) {
  return (
    <div className="min-h-screen bg-[#235ADC] text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#0054E3] to-[#2989d8] p-4 flex items-center gap-2">
          <Monitor className="h-6 w-6" />
          <h1 className="text-xl font-bold text-white">PI's Adventure.exe</h1>
        </div>
        
        <div className="p-8 space-y-4 bg-[#ECE9D8]">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2 text-[#0054E3]">PI's Adventure</h2>
            <p className="text-gray-600">A Retro Survival Game</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onStartGame}
              className="w-full p-4 bg-[#2989d8] hover:bg-[#0054E3] text-white rounded font-bold transition-colors flex items-center justify-center gap-2"
            >
              🎮 Start Game
            </button>
            
            <button
              onClick={onShowInstructions}
              className="w-full p-4 bg-white hover:bg-gray-100 border-2 border-[#2989d8] text-[#2989d8] rounded font-bold transition-colors flex items-center justify-center gap-2"
            >
              📖 How to Play
            </button>
            
            <button
              onClick={onShowStats}
              className="w-full p-4 bg-white hover:bg-gray-100 border-2 border-[#2989d8] text-[#2989d8] rounded font-bold transition-colors flex items-center justify-center gap-2"
            >
              📊 Statistics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}