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
  startingIndex: number = 0;
  truthData: any;
  dareData: any;
  numberOfTruths: number = 4;
  numberOfDares: number = 5;
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

  constructor(private service: GameplayService, private http: HttpClient, private router: Router) {}

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

  private gameSetup() {
    this.getDare();
    this.getTruth();
    this.rangeOfTruths();
    this.rangeOfDares();
  }

  private getTruth() {
    this.http.get('https://truth-or-dare-backend.onrender.com/truth/').subscribe((response) => {
      this.truthData = response;
    });
  }

  private getDare() {
    this.http.get('https://truth-or-dare-backend.onrender.com/dare').subscribe((response) => {
      this.dareData = response;
    });
  }

  public showTruth() {
    if (this.truthArray.length > 0) {
      let randomTruthNumber = this.pickRandomUniqueTruth();
      this.service.state.currentInstructions =
        this.truthData[randomTruthNumber].instructions;
      const index = this.truthArray.indexOf(randomTruthNumber);
      this.truthArray.splice(index, 1);
    } else {
      this.gameOver();
    }
  }

  public showDare() {
    if (this.dareArray.length > 0) {
      let randomDareNumber = this.pickRandomUniqueDare();
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

    for (let i = 0; i < this.numberOfTruths; i++) {
      truthArray.push(i);
    }
    return truthArray;
  }

  private rangeOfDares(): Array<number> {
    let dareArray: Array<number> = [];

    for (let i = 0; i < this.numberOfDares; i++) {
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
    if (this.truthArray.length === 0 && this.dareArray.length === 0) {
      alert('game is over');
      this.router.navigate(['/playagain']);
    } else if (this.truthArray.length === 0) {
      this.noTruthsLeft();
    } else if (this.dareArray.length === 0) {
      this.noDaresLeft();
    } else {
      alert('i have not accountd for this error. game will restart now');
      this.router.navigate(['']);
    }
  }

  private noTruthsLeft() {
    alert('there are no more truths left. please select a dare :)');
  }

  private noDaresLeft() {
    alert('there are no more dares left. please select a truth :)');
  }

}
