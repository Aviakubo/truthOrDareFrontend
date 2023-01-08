import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameplayComponent } from './gameplay/gameplay.component';
import { MainEntryComponent } from './main-entry/main-entry.component';
import { PlayAgainComponent } from './play-again/play-again.component';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
  { path: '', component: MainEntryComponent },
  { path: 'players', component: PlayerListComponent },
  { path: 'game', component: GameplayComponent },
  { path: 'playagain', component: PlayAgainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
