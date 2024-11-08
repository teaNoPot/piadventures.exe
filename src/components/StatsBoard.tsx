import React from 'react';
import { ArrowLeft, Trophy, Clock, Droplets } from 'lucide-react';
import { GameStats } from '../types';

type StatsBoardProps = {
  stats: GameStats;
  onBack: () => void;
};

export function StatsBoard({ stats, onBack }: StatsBoardProps) {
  return (
    <div className="min-h-screen bg-[#235ADC] p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#0054E3] to-[#2989d8] p-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Statistics</h1>
          <button
            onClick={onBack}
            className="text-white hover:text-gray-200 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Menu
          </button>
        </div>
        
        <div className="p-8 bg-[#ECE9D8] space-y-6">
          <div className="grid gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-[#2989d8]">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <h3 className="font-bold text-[#0054E3]">Highest Score</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">{stats.highestScore}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-[#2989d8]">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-6 w-6 text-blue-500" />
                <h3 className="font-bold text-[#0054E3]">Longest Survival</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">{stats.longestSurvival} steps</p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-[#2989d8]">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="h-6 w-6 text-blue-500" />
                <h3 className="font-bold text-[#0054E3]">Most Water Collected</h3>
              </div>
              <p className="text-3xl font-bold text-gray-800">{stats.mostWaterInGame}</p>
            </div>
          </div>

          <div className="mt-6 text-center text-gray-600">
            <p>Total Games Played: {stats.totalGames}</p>
            <p>Last Played: {new Date(stats.lastPlayed).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}