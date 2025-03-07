import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameStateType } from './types';

const gameInitialState: GameStateType = {
  id: 0,
  board: [],
  currentPlayer: '',
  status: '',
  winner: 'null',
  userId: 0,
  userStats: {
    id: 0,
    losses: 0,
    wins: 0,
    draws: 0,
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: gameInitialState,
  reducers: {
    startGameSession: (state, { payload }: PayloadAction<any>) => {
      state.id = payload?.id;
      state.board = payload?.board;
      state.currentPlayer = payload?.currentPlayer;
      state.status = payload?.status;
      state.winner = payload?.winner;
      state.userId = payload?.userId;
    },
    updateBoard: (state, { payload }: PayloadAction<any>) => {
      state.board = payload?.board;
    },
    updateUserStats: (state, { payload }: PayloadAction<any>) => {
      state.stats = payload.stats;
    },
  },
});

export const { startGameSession, updateBoard, updateUserStats } = gameSlice.actions;
export default gameSlice.reducer;
