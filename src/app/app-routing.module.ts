import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameplayComponent } from './gameplay/gameplay.component';
import { MainEntryComponent } from './main-entry/main-entry.component';

const routes: Routes = [
  { path: '', component: MainEntryComponent },
  { path: 'game', component: GameplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
