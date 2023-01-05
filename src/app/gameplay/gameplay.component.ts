import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameplayState } from './definitions/gameplay.interface';
import { GameplayService } from './gameplay.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './template/gameplay.component.html',
  styleUrls: ['./template/gameplay.component.scss'],
})
export class GameplayComponent {
  startingIndex: number = 0;
  truthData: any;
  dareData: any;
  numberOfTruthsOrDares: number = 4;
  truthArray: Array<number> = this.rangeOfTruths();
  dareArray: Array<number> = this.rangeOfDares();
  private subscriptions: Subscription = new Subscription();

  @Input() set state(value: GameplayState) {
    this.service.updateState(value);
  }

  get state(): GameplayState {
    return this.service.state;
  }

  @Output() stateChanged: EventEmitter<GameplayState> =
    new EventEmitter<GameplayState>();

  constructor(private service: GameplayService, private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
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

  gameSetup() {
    this.getDare();
    this.getTruth();
    this.rangeOfTruths();
    this.rangeOfDares();
  }

  private getTruth() {
    this.http.get('http://localhost:4000/truth/').subscribe((response) => {
      this.truthData = response;
    });
  }

  private getDare() {
    this.http.get('http://localhost:4000/dare').subscribe((response) => {
      this.dareData = response;
    });
  }

  public showTruth() {
    this.selectActivePlayer();
    if (this.truthArray.length > 0) {
      let randomTruthNumber = this.pickRandomUniqueTruth();
      console.log(this.dareData[randomTruthNumber].instructions);
      this.service.state.currentInstructions =
        this.truthData[randomTruthNumber].instructions;
      const index = this.truthArray.indexOf(randomTruthNumber);
      this.truthArray.splice(index, 1);
    } else {
      this.gameOver();
    }
  }

  public showDare() {
    this.selectActivePlayer();
    if (this.dareArray.length > 0) {
      let randomDareNumber = this.pickRandomUniqueDare();
      console.log(this.dareData[randomDareNumber].instructions);
      this.service.state.currentInstructions =
        this.dareData[randomDareNumber].instructions;
      const index = this.dareArray.indexOf(randomDareNumber);
      this.dareArray.splice(index, 1);
    } else {
      this.gameOver();
    }
  }

  private rangeOfTruths(): Array<number> {
    let truthArray: Array<number> = [];

    for (let i = 0; i < this.numberOfTruthsOrDares; i++) {
      truthArray.push(i);
    }
    return truthArray;
  }

  private rangeOfDares(): Array<number> {
    let dareArray: Array<number> = [];

    for (let i = 0; i < this.numberOfTruthsOrDares; i++) {
      dareArray.push(i);
    }
    return dareArray;
  }

  public pickRandomUniqueDare(): number {
    const randomDareNumber =
      this.dareArray[Math.floor(Math.random() * this.dareArray.length)];

    return randomDareNumber;
  }

  public pickRandomUniqueTruth(): number {
    const randomTruthNumber =
      this.truthArray[Math.floor(Math.random() * this.truthArray.length)];

    return randomTruthNumber;
  }

  private gameOver() {
    console.log('this is the technical game end');
  }

  public selectActivePlayer() {
    let playersArray = this.state.players.firstNames;
    if (this.startingIndex === 0) {
      this.state.currentPlayer = playersArray[this.startingIndex];
      this.startingIndex = this.startingIndex + 1;
    } else if (this.startingIndex !== playersArray.length - 1) {
      this.state.currentPlayer = playersArray[this.startingIndex];
      this.startingIndex = this.startingIndex + 1;
    } else if (this.startingIndex === playersArray.length - 1) {
      this.state.currentPlayer = playersArray[this.startingIndex];
      this.startingIndex = 0;
    }
  }
}
