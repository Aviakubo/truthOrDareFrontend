import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerListState } from './definitions/player-list.interface';
import { PlayerListFactory } from './player-list.factory';

@Injectable({
  providedIn: 'root'
})
export class PlayerListService {
  
  private state$: BehaviorSubject<PlayerListState> = new BehaviorSubject<PlayerListState>(PlayerListFactory.buildState());

  get state(): PlayerListState {
    return this.state$.value
  }
  
  get stateChanged(): Observable<PlayerListState> {
    return this.state$.asObservable();
  }
  constructor() { }

  public updateState(value: PlayerListState) {
    this.state$.next(value);
  };
}
