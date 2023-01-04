import { PlayerListState } from "./definitions/player-list.interface";

export class PlayerListFactory {
    public static buildState(): PlayerListState {
        return {
            firstNames: [ '' ]
        }
    }
}