import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { MainEntryComponent } from './main-entry/main-entry.component';
import { HttpClientModule, HttpClient } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    MainEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
