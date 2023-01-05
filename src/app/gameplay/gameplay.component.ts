import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gameplay',
  templateUrl: './template/gameplay.component.html',
  styleUrls: ['./template/gameplay.component.scss'],
})
export class GameplayComponent {
  truthData: any;
  dareData: any;
  numberOfTruthsOrDares: number = 3;
  rangeArray = this.rangeOfQuestions();

  ngOnInit() {
    this.getTruth();
    this.getDare();
    this.rangeOfQuestions();
  }

  constructor(private http: HttpClient) {}

  getTruth() {
    this.http.get('http://localhost:4000/truth/').subscribe((response) => {
      this.truthData = response;
    });
  }

  getDare() {
    this.http.get('http://localhost:4000/dare').subscribe((response) => {
      this.dareData = response;
    });
  }

  showTruth() {
    let randomTruth = this.pickRandomUniqueQuestion();
    if (this.rangeArray.length > 0) {
      console.log(this.dareData[randomTruth].instructions);
    } else {
      this.gameOver();
    };
  };

  showDare() {
    let randomDare = this.pickRandomUniqueQuestion();
    if (this.rangeArray.length > 0) {
      // this should probably update state or something
      console.log(this.dareData[randomDare].instructions);
    } else {
      this.gameOver();
    };
  };

  private rangeOfQuestions() {
    let rangeArray: Array<number> = [];

    for (let i = 0; i <= this.numberOfTruthsOrDares; i++) {
      rangeArray.push(i);
    }
    return rangeArray;
  }

  public pickRandomUniqueQuestion(): number {
    const randomNumber =
      this.rangeArray[Math.floor(Math.random() * this.rangeArray.length)];
    const index = this.rangeArray.indexOf(randomNumber);
    const x = this.rangeArray.splice(index, 1);
    const errorMessage: string = 'the game has had an oopsie';
      return randomNumber;
  }

  gameOver() {
    console.log('this is the technical game end');
  }
}
