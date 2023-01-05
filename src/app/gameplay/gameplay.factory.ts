import { GameplayState } from "./definitions/gameplay.interface";

export class GameplayFactory {
    public static buildState(): GameplayState {
        return {
            players: {
                firstNames: ['player 1', 'player 2']
            },
            currentPlayer: '',
            dare: false,
            currentInstructions: ''
        }
    }
}