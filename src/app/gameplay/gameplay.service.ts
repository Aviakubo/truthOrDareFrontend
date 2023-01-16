import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GameplayState } from "./definitions/gameplay.interface";
import { GameplayFactory } from "./gameplay.factory";

@Injectable({
    providedIn: 'root'
})
export class GameplayService {

    private state$: BehaviorSubject<GameplayState> = new BehaviorSubject<GameplayState>(GameplayFactory.buildState());

    get state(): GameplayState {
        return this.state$.value
    };

    get stateChanged(): Observable<GameplayState> {
        return this.state$.asObservable();
    };

    constructor() {};

    public updateState(value: GameplayState) {
        this.state$.next(value);
    };

}
