type RegisteLoginrUserObj = {
    id: number;
    email: string;
    name: string;
};

type StatisticsObj = {
    id: number;
    wins: number;
    losses: number;
    draws: number;
};

export type RegisterLoginResponse = {
    user: RegisteLoginrUserObj;
    token: string;
};

export type StartWithPlayerResponse = {
    startWithPlayer: boolean;
};


export type PlayMoveResponse = {
    board: any;
    sessionId: number;
};

export type StatisticsResponse = {
    stats: StatisticsObj;
    id: number;
};
