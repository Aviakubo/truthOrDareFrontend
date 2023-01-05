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
  randomInteger = Math.floor(Math.random() * 2);

  constructor(private http: HttpClient) {};

  getTruth() {
    this.http.get('http://localhost:4000/truth/').subscribe((response) => {
      this.truthData = response;
      console.log(this.truthData[this.randomInteger].instructions);
    })
  };

  getDare() {
    this.http.get('http://localhost:4000/dare').subscribe((response) => {
      this.dareData = response;
      console.log(this.dareData[this.randomInteger].instructions);
    })
  };
};
