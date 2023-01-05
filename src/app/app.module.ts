import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { MainEntryComponent } from './main-entry/main-entry.component';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { GameplayComponent } from './gameplay/gameplay.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    MainEntryComponent,
    GameComponent,
    GameplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
