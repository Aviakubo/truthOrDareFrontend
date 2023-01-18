import { GameplayState } from './definitions/gameplay.interface';

export class GameplayFactory {
  public static buildState(): GameplayState {
    return {
      gameStarted: false,
      loading: true,
      dare: null,
      currentStatement: 'Youngest Player Goes First',
      category: 'classic',
      numberOfDares: 0,
      numberOfTruths: 0,
      currentDares: [''],
      currentTruths: ['']
    };
  }
}
