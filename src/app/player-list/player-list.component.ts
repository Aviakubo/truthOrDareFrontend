import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerListService } from './player-list.service';
import { Subscription } from 'rxjs';
import { PlayerListState } from './definitions/player-list.interface';

@Component({
  selector: 'app-player-list',
  templateUrl: './template/player-list.component.html',
  styleUrls: ['./template/player-list.component.scss'],
})

export class PlayerListComponent {
  firstName: string = "";
  playerListArray: PlayerListState = { firstNames: []};

  private subscriptions: Subscription = new Subscription();

  @Input() set state(value: PlayerListState) {
    this.service.updateState(value);
  };

  get state(): PlayerListState {
    return this.service.state;
  };

  @Output() stateChanged: EventEmitter<PlayerListState> = new EventEmitter<PlayerListState>();

  constructor(private http: HttpClient, private service: PlayerListService) {};

  async ngOnInit(): Promise<void> {
    this.initSubscriptions();
  };

  private initSubscriptions(): void {
    const stateChangedSubs: Subscription = this.service.stateChanged.subscribe(
      (next: PlayerListState) => this.stateChanged.emit(next)
    );
  };

  private destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  };

  ngOnDestroy(): void {
    this.destroySubscriptions();
  };

  public addPlayer() {
    if(this.firstName !== "") {
      this.playerListArray.firstNames.push(this.firstName);
    };
    this.firstName = "";
    this.service.updateState(this.playerListArray);

  };

   public removePlayer() {
    this.playerListArray.firstNames.pop();
  };

  public startGame() {
    console.log('this should technically start the game');
  };
}
