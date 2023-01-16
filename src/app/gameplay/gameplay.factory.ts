import { GameplayState } from "./definitions/gameplay.interface";

export class GameplayFactory {
    public static buildState(): GameplayState {
        return {
            gameStarted: false,
            dare: null,
            statement: 'Youngest Player Goes First',
            category: 'classic'
        }
    }
}