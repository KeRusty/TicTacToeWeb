import React, { useEffect, useState } from 'react';
import AuthService from '../api/AuthService';
import { GameStats } from '../types';
import { Trophy, X, Minus } from 'lucide-react';

const Stats: React.FC = () => {
  const [stats, setStats] = useState<GameStats>({ wins: 0, losses: 0, draws: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await AuthService.getStats();
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
      <div className="bg-green-100 p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-green-800">Wins</h3>
          <Trophy className="w-8 h-8 text-green-600" />
        </div>
        <p className="text-4xl font-bold text-green-600">{stats.wins}</p>
      </div>

      <div className="bg-red-100 p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-red-800">Losses</h3>
          <X className="w-8 h-8 text-red-600" />
        </div>
        <p className="text-4xl font-bold text-red-600">{stats.losses}</p>
      </div>

      <div className="bg-gray-100 p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Draws</h3>
          <Minus className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-4xl font-bold text-gray-600">{stats.draws}</p>
      </div>
    </div>
  );
};

export default Stats;