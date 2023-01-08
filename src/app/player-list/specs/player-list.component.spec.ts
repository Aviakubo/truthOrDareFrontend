import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Gameplay } from 'src/app/gameplay/definitions/gameplay.interface';
import { GameplayService } from 'src/app/gameplay/gameplay.service';
import { PlayerListState } from '../definitions/player-list.interface';

import { PlayerListComponent } from '../player-list.component';
import { PlayerListFactory } from '../player-list.factory';

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

  it('should set state', () => {
    const state = spyOnProperty(component, 'state', 'set').and.callThrough();
    const update = {} as unknown as PlayerListState;
    component.state = update;
    expect(state).toHaveBeenCalledWith(update);
  });

  it('should get state', () => {
    const state = PlayerListFactory.buildState();
    expect(state).toEqual(component.state);
  });

});
