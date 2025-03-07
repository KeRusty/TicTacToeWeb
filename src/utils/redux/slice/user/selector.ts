import { RootState } from '../../reducer';
import { UserStateType } from './types';

export const getUserDetails = (state: RootState): UserStateType | null => {
  return state.user ?? null;
};
