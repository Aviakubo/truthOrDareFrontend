import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-gameplay',
  templateUrl: './template/gameplay.component.html',
  styleUrls: ['./template/gameplay.component.scss']
})
export class GameplayComponent {
  truthData: any;
  dareData: any;
  numberOfTruthsOrDares: number = 4;
  rangeArray = this.rangeOfQuestions();

  ngOnInit() {
    this.getTruth();
    this.getDare();
    this.rangeOfQuestions();
  }

  constructor(private http: HttpClient) {};

  getTruth() {
    this.http.get('http://localhost:4000/truth/').subscribe((response) => {
      this.truthData = response;
    })
  };

  getDare() {
    this.http.get('http://localhost:4000/dare').subscribe((response) => {
      this.dareData = response;
    });
  };

  showTruth() {
    console.log(this.truthData);
  };

  showDare() {
    console.log(this.dareData);
  };


  private rangeOfQuestions() {
    let rangeArray: Array<number> = [];

    for (let i = 1; i <= this.numberOfTruthsOrDares; i++) {
      rangeArray.push(i);
    };
    return rangeArray;
  };

  public pickRandomUniqueQuestion() {
    const randomNumber = this.rangeArray[Math.floor(Math.random() * this.rangeArray.length)];
    const index = this.rangeArray.indexOf(randomNumber);
    const x = this.rangeArray.splice(index, 1);
    const errorMessage: string = "the game has had an oopsie"
    if(this.rangeArray.length > 0) {
    return randomNumber } else {
      this.gameOver();
      return console.log(errorMessage);
    }
  };

  gameOver() {
    console.log('this is the technical game end')
  };
};
