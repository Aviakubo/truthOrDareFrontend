import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})

export class PlayerListComponent {
  firstName: string = "";
  playerListArray: Array<string> = [];

  constructor(private http: HttpClient) {};

  public addPlayer() {
    if(this.firstName !== "") {
      this.playerListArray.push(this.firstName);
    };
    this.firstName = "";

  };

   public removePlayer() {
    this.playerListArray.pop();
  };

  public startGame() {
    console.log('this should technically start the game');
    this.addPlayer();
  };
}
