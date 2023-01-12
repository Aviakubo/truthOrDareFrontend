import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainEntryComponent } from './main-entry/main-entry.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { GameplayComponent } from './gameplay/gameplay.component';
import { PackSelectionComponent } from './pack-selection/pack-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    MainEntryComponent,
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
