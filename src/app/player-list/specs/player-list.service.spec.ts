import { TestBed } from '@angular/core/testing';
import { PlayerListState } from '../definitions/player-list.interface';
import { PlayerListFactory } from '../player-list.factory';

import { PlayerListService } from '../player-list.service';

describe('PlayerListService', () => {
  let service: PlayerListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call updateState', () => {
    const value: PlayerListState = {} as unknown as PlayerListState;
    const stateCall = spyOn(service, 'updateState').and.callThrough();
    service.updateState(value);
    expect(stateCall).toHaveBeenCalled();
  });

  it('should update state when state is changed', () => {
    const state = PlayerListFactory.buildState();
    let count = 0;

    service.stateChanged.subscribe({
      next: (confirmState) => {
        count++;
        expect(confirmState).toBeTruthy;
      }
    });
    service.updateState(state);
    expect(count).toEqual(2);
  });
});
