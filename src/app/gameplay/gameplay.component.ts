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
  numberOfTruthsOrDares: number = 4;
  truthArray: Array<number> = this.rangeOfTruths();
  dareArray: Array<number> = this.rangeOfDares();

  ngOnInit() {
    this.getTruth();
    this.getDare();
    this.rangeOfTruths();
    this.rangeOfDares();
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
    if (this.truthArray.length > 0) {
      let randomTruthNumber = this.pickRandomUniqueTruth();
      console.log(this.dareData[randomTruthNumber].instructions);
      const index = this.truthArray.indexOf(randomTruthNumber);
      this.truthArray.splice(index, 1);
    } else {
      this.gameOver();
    }
  }

  showDare() {
    if (this.dareArray.length > 0) {
      let randomDareNumber = this.pickRandomUniqueDare();
      console.log(this.dareData[randomDareNumber].instructions);
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

  gameOver() {
    console.log('this is the technical game end');
  }
}
