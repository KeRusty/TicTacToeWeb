export interface User {
  id: string;
  username: string;
}

export interface GameStats {
  wins: number;
  losses: number;
  draws: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}