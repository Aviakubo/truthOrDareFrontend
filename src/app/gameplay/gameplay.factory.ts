import { GameplayState } from "./definitions/gameplay.interface";

export class GameplayFactory {
    public static buildState(): GameplayState {
        return {
            dare: false,
            currentInstructions: ''
        }
    }
}