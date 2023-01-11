export interface Gameplay {
    state: GameplayState
};

export interface GameplayState {
    dare: boolean,
    currentInstructions: string
};