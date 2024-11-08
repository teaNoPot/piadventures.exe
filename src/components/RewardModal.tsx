import React from 'react';
import { Buff } from '../types';

type RewardModalProps = {
  buffs: Buff[];
  onSelect: (buff: Buff) => void;
};

export function RewardModal({ buffs, onSelect }: RewardModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Reward!</h2>
        <p className="text-gray-600 mb-4">
          Congratulations on surviving! Choose one buff for the next generation:
        </p>
        <div className="grid gap-3">
          {buffs.map((buff, index) => (
            <button
              key={index}
              onClick={() => onSelect(buff)}
              className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{buff.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-800">{buff.name}</h3>
                  <p className="text-sm text-gray-600">{buff.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}