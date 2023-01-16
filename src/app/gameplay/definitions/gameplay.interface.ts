export interface Gameplay {
    state: GameplayState
};

export interface GameplayState {
    gameStarted: boolean,
    dare: boolean | null,
    statement: string,
    category: string
};
