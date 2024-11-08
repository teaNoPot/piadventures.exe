import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CELL_SYMBOLS } from '../types';

type InstructionsProps = {
  onBack: () => void;
};

export function Instructions({ onBack }: InstructionsProps) {
  return (
    <div className="min-h-screen bg-[#235ADC] p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#0054E3] to-[#2989d8] p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">How to Play</h1>
          <button
            onClick={onBack}
            className="text-white hover:text-gray-200 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Menu
          </button>
        </div>
        
        <div className="p-8 bg-[#ECE9D8] space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0054E3]">Game Elements</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{CELL_SYMBOLS.pi}</span>
                <span>Your character (PI)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{CELL_SYMBOLS.water}</span>
                <span>Water (Heals & Points)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{CELL_SYMBOLS.fire}</span>
                <span>Fire (Damages)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{CELL_SYMBOLS.poison}</span>
                <span>Poison (High Damage)</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0054E3]">How to Play</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>PI moves automatically seeking water</li>
              <li>Collect water to heal and gain points</li>
              <li>Avoid fire and poison when possible</li>
              <li>Collect all water to advance to next generation</li>
              <li>Choose buffs between generations</li>
              <li>Try to achieve the highest score!</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-[#0054E3]">Scoring</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Water Collection: +100 points</li>
              <li>Survival Step: +5 points</li>
              <li>Fire Damage: -20 points</li>
              <li>Poison Damage: -30 points</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}