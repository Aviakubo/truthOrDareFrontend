import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameplayState } from './definitions/gameplay.interface';
import { GameplayService } from './gameplay.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './template/gameplay.component.html',
  styleUrls: ['./template/gameplay.component.scss'],
})
export class GameplayComponent {
  truthArray: Array<number> = [];
  dareArray: Array<number> = [];
  private subscriptions: Subscription = new Subscription();

  @Input() set state(value: GameplayState) {
    this.service.updateState(value);
  }

  get state(): GameplayState {
    return this.service.state;
  }

  @Output() stateChanged: EventEmitter<GameplayState> =
    new EventEmitter<GameplayState>();

  constructor(private service: GameplayService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    // console.log(this.gameData.);
    this.gameSetup();
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

  private gameSetup() {
    this.getTruths();
    this.getDares();
  }

  private getTruths() {
    this.http.get<Array<string>>(`https://truth-or-dare-backend.onrender.com/randomtruth/${this.state.category}`).subscribe((response) => {
      this.state.currentTruths = response;
    });
    this.service.updateState(this.state);
  }

  private getDares() {
    this.http.get<Array<string>>(`https://truth-or-dare-backend.onrender.com/randomdare/${this.state.category}`).subscribe((response) => {
      this.state.currentDares = response;
    });
    this.service.updateState(this.state);
  }

  public showTruth() {
    this.service.state.dare = false;
    this.rangeOfTruths();
    this.pickRandomUniqueTruth();
    if (this.truthArray.length > 0) {
      let randomTruthNumber = this.pickRandomUniqueTruth();
      this.service.state.currentStatement =
        this.state.currentTruths[randomTruthNumber];
      const index = this.truthArray.indexOf(randomTruthNumber);
      this.truthArray.splice(index, 1);
    } else {
      this.getTruths();
    }
  }

  public showDare() {
    this.service.state.dare = true;
    this.rangeOfDares();
    this.pickRandomUniqueDare();
    if (this.dareArray.length > 0) {
      let randomDareNumber = this.pickRandomUniqueDare();
      this.service.state.currentStatement =
        this.state.currentDares[randomDareNumber];
      const index = this.dareArray.indexOf(randomDareNumber);
      this.dareArray.splice(index, 1);
    } else {
      this.getDares();
    }
  }

  private rangeOfTruths(): Array<number> {
    this.truthArray = [];
    for (let i = 0; i < this.state.currentTruths.length; i++) {
      this.truthArray.push(i);
    }
    return this.truthArray;
  }

  private rangeOfDares(): Array<number> {
    this.dareArray = [];
    for (let i = 0; i < this.state.currentDares.length; i++) {
      this.dareArray.push(i);
    }
    return this.dareArray;
  }

  public pickRandomUniqueTruth(): number {

    const randomTruthNumber =
      this.truthArray[Math.floor(Math.random() * this.state.currentTruths.length)];
    return randomTruthNumber;
  }

  public pickRandomUniqueDare(): number {
    const randomDareNumber =
      this.dareArray[Math.floor(Math.random() * this.state.currentDares.length)];
    return randomDareNumber;
  }
}
