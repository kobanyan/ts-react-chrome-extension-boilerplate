import { createStore } from 'redux';
import * as module from '../module';

describe('options module', () => {
  it('should update favoriteColor only', () => {
    const state = module.reducer(module.INITIAL_STATE, module.updateFavoriteColor('yellow'));
    expect(state).toEqual({ favoriteColor: 'yellow', likesColor: false });
  });
  it('should update likesColor only', () => {
    const state = module.reducer(module.INITIAL_STATE, module.updateLikesColor(true));
    expect(state).toEqual({ favoriteColor: 'red', likesColor: true });
  });
});
