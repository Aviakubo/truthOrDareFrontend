import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayerListService } from './player-list.service';
import { Subscription } from 'rxjs';
import { PlayerListState } from './definitions/player-list.interface';
import { GameplayService } from '../gameplay/gameplay.service';
import { Router } from '@angular/router';

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

  constructor(private service: PlayerListService, private gameService: GameplayService, private router: Router) {};

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
    if(this.playerListArray.firstNames.length < 2) {
      alert("please add more than one player");
    } else {
      this.gameService.state.players = this.service.state;
      this.router.navigateByUrl('/game');
    }
  };
}
