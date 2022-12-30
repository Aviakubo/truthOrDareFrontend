import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent {
  constructor(private http: HttpClient) {}

  public addPlayer() {
    this.http.post('/players', { name: 'David', gender: 'Male' }).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

  public startGame() {
    console.log('this should technically start the game');
  }
}
