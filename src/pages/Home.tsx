import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TowerControl as GameController, BarChart3 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails } from '../utils/redux/slice/user/selector';
import AuthService from '../api/AuthService';
import { startGameSession } from '../utils/redux/slice/game/slice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector(getUserDetails);

  const startNewGameSession = async () => {
    try {
      const startSession = await AuthService.createGameSession(true);
      if (startSession) {
        dispatch(startGameSession(startSession));
      }
    } catch (error) {
      console.error('Register error', error);
    }
  };

  useEffect(() => {
    if (userDetails) {
      startNewGameSession();
    }
  }, [userDetails]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to Tic Tac Toe</h2>
          <p className="mt-2 text-sm text-gray-600">Choose what you'd like to do</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/game')}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <GameController className="h-6 w-6" />
            Play New Game
          </button>

          <button
            onClick={() => navigate('/stats')}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <BarChart3 className="h-6 w-6" />
            View Statistics
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;