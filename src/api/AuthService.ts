

import api from './api';
import { PlayMoveResponse, RegisterLoginResponse, StatisticsResponse } from './interface';

class AuthService {
    async login(email: string, password: string): Promise<RegisterLoginResponse> {
        try {
            const response = await api.post<RegisterLoginResponse>('/auth/login', { email, password });
            const { token } = response.data;
            if (token) {
                await localStorage.setItem('token', token?.toString());
            }
            return response.data;
        } catch (error: any) {
            console.error('Login failed:', error.response?.data || error.message);
            throw error;
        }
    }

    async register(email: string, password: string, name: string): Promise<RegisterLoginResponse> {
        try {
            const response = await api.post<RegisterLoginResponse>('/auth/register', { email, password, name });
            const { token } = response.data;
            if (token) {
                await localStorage.setItem('token', token?.toString());
            }
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async logout(): Promise<void> {
        await localStorage.removeItem('token');
    }

    async createGameSession(startWithPlayer: boolean): Promise<StartWithPlayerResponse> {
        try {
            const response = await api.post<StartWithPlayerResponse>('/game/create_game_session', { startWithPlayer: startWithPlayer });
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async playerMove(board: any, sessionID: Number): Promise<PlayMoveResponse> {
        try {
            const response = await api.post<PlayMoveResponse>('/game/player_move', { board, sessionId: sessionID });
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async cpuMove(board: any, sessionID: Number): Promise<PlayMoveResponse> {
        try {
            const response = await api.post<PlayMoveResponse>('/game/pc_move', { board, sessionId: sessionID });
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }

    async getStats(): Promise<StatisticsResponse> {
        try {
            const response = await api.get<StatisticsResponse>('/stats');
            return response.data;
        } catch (error: any) {
            throw error;
        }
    }
}

export default new AuthService();
