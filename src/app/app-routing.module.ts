import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainEntryComponent } from './main-entry/main-entry.component';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
  { path: 'home', component: MainEntryComponent },
  { path: 'players', component: PlayerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
