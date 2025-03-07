import { RootState } from '../../reducer';
import { GameStateType } from './types';

export const getGameDetails = (state: RootState): GameStateType | null => {
  return state.game ?? null;
};

export const getUserStats = (state: RootState): GameStateType | null => {
  return state.userStats ?? null;
};
