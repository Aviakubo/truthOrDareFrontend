import { TestBed } from "@angular/core/testing";
import { GameplayState } from "../definitions/gameplay.interface";
import { GameplayFactory } from "../gameplay.factory";
import { GameplayService } from "../gameplay.service"

describe('GameplayService', () => {
    let service: GameplayService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GameplayService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should call updateState', () => {
        const value: GameplayState = {} as unknown as GameplayState;
        const stateCall = spyOn(service, 'updateState').and.callThrough();
        service.updateState(value);
        expect(stateCall).toHaveBeenCalled();
    });

    it('should update state when state is changed', () => {
        const state = GameplayFactory.buildState();
        let count = 0;

        service.stateChanged.subscribe({
            next: (confirmState) => {
                count ++;
                expect(confirmState).toBeTruthy;
            }
        });
        service.updateState(state);
        expect(count).toEqual(2);
    });
})