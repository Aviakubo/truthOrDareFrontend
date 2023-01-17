export interface Gameplay {
    state: GameplayState
};

export interface GameplayState {
    gameStarted: boolean,
    dare: boolean | null,
    currentStatement: string,
    category: string,
    numberOfDares: number,
    numberOfTruths: number,
    currentDares: Array<string>,
    currentTruths: Array<string>
};