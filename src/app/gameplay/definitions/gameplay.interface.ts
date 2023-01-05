import { PlayerListState } from "src/app/player-list/definitions/player-list.interface"

export interface Gameplay {
    state: GameplayState
};

export interface GameplayState {
    players: PlayerListState,
    currentPlayer: string,
    dare: boolean,
    currentInstructions: string
};