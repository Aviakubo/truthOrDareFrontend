import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { GameplayState } from '../definitions/gameplay.interface';

import { GameplayComponent } from '../gameplay.component';

describe('GameplayComponent', () => {
  let component: GameplayComponent;
  let fixture: ComponentFixture<GameplayComponent>;
  let httpMock: HttpClient;
  let routerMock: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameplayComponent ],
      providers: [{ provide: HttpClient, useValue: httpMock }, { provide: Router, useValue: routerMock } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set state', () => {
    const state = spyOnProperty(component, 'state', 'set').and.callThrough();
    const update = {} as unknown as GameplayState;
    component.state = update;
    expect(state).toHaveBeenCalledWith(update);
  });

});
