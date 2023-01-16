import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameplayState } from '../gameplay/definitions/gameplay.interface';
import { GameplayService } from '../gameplay/gameplay.service';

@Component({
  selector: 'app-main-entry',
  templateUrl: './template/main-entry.component.html',
  styleUrls: ['./template/main-entry.component.scss']
})
export class MainEntryComponent {
  private subscriptions: Subscription = new Subscription();

  @Input() set state(value: GameplayState) {
    this.service.updateState(value);
  }

  get state(): GameplayState {
    return this.service.state;
  }

  @Output() stateChanged: EventEmitter<GameplayState> = 
  new EventEmitter<GameplayState>();

  constructor(private router: Router, private service: GameplayService) {}

  public startGame(type: string) {
    this.service.state.category = type;
    this.router.navigate(['/game']);
  };

  ngOnInit() {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    const stateChangedSubs: Subscription = this.service.stateChanged.subscribe(
      (next: GameplayState) => this.stateChanged.emit(next)
    );
  }

  private destroySubscriptions(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

}
