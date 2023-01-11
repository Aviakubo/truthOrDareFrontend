import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainEntryComponent } from './main-entry/main-entry.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game/game.component';
import { GameplayComponent } from './gameplay/gameplay.component';
import { PackSelectionComponent } from './pack-selection/pack-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    MainEntryComponent,
    GameComponent,
    GameplayComponent,
    PackSelectionComponent
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
