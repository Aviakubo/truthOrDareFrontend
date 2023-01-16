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
  category: string = this.service.state.category;
  startingIndex: number = 0;
  truthData: any;
  dareData: any;
  gameLimit: number = 15;
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
    // this.rangeOfTruths();
    // this.rangeOfDares();
  }

  private getTruths() {
    this.http.get(`https://truth-or-dare-backend.onrender.com/truthanddare/${this.category}/truth`).subscribe((response) => {
      this.truthData = response;
      this.numberOfTruths = this.truthData.length;
    });
  }

  private getDares() {
    this.http.get(`https://truth-or-dare-backend.onrender.com/${this.category}/dare`).subscribe((response) => {
      this.dareData = response;
      this.numberOfDares = this.dareData.length;
    });
  }

  public showTruth() {
    this.service.state.dare = false;
    if (this.truthArray.length > 0) {
      let randomTruthNumber = this.pickRandomUniqueTruth();
      this.service.state.statement =
        this.truthData[randomTruthNumber].statement;
      const index = this.truthArray.indexOf(randomTruthNumber);
      this.truthArray.splice(index, 1);
    } else {
      this.gameOver();
    }
  }

  public showDare() {
    this.service.state.dare = true;
    if (this.dareArray.length > 0) {
      let randomDareNumber = this.pickRandomUniqueDare();
      this.service.state.statement =
        this.dareData[randomDareNumber].statement;
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

  public pickRandomUniqueTruth(): number {
    const randomTruthNumber =
      this.truthArray[Math.floor(Math.random() * this.truthData.length)];

    return randomTruthNumber;
  }

  public pickRandomUniqueDare(): number {
    const randomDareNumber =
      this.dareArray[Math.floor(Math.random() * this.dareData.length)];

    return randomDareNumber;
  }

  private gameOver() {
    if (this.truthArray.length === 0 && this.dareArray.length === 0) {
      alert('game is over');
      this.router.navigate(['/']);
    } else if (this.truthArray.length === 0) {
      this.noTruthsLeft();
    } else if (this.dareArray.length === 0) {
      this.noDaresLeft();
    } else {
      alert('i have not accounted for this error. game will restart now');
      this.router.navigate(['/']);
    }
  }

  private noTruthsLeft() {
    alert('there are no more truths left. please select a dare :)');
  }

  private noDaresLeft() {
    alert('there are no more dares left. please select a truth :)');
  }

}
