export type GameStateType = {
  id: number;
  board: any;
  currentPlayer: string;
  status: string;
  winner: string | null;
  userId: number;
  userStats: Stats;
};

type Stats = {
  id: number;
  losses: number;
  wins: number;
  draws: number;
};
