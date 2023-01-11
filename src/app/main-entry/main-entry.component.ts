import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-entry',
  templateUrl: './main-entry.component.html',
  styleUrls: ['./main-entry.component.scss']
})
export class MainEntryComponent {
  constructor(private router: Router) {}

  startGame() {
    this.router.navigateByUrl('/game');
  }
}
