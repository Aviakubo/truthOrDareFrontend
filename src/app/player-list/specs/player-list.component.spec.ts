import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Gameplay } from 'src/app/gameplay/definitions/gameplay.interface';
import { GameplayService } from 'src/app/gameplay/gameplay.service';

import { PlayerListComponent } from '../player-list.component';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let routerMock: Router;
  let gameplayServiceMock: Gameplay

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerListComponent ],
      imports: [ FormsModule ],
      providers: [{ useValue: Router, provide: routerMock }, { useValue: GameplayService, provide: gameplayServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
