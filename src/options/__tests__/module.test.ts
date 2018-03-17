import { createStore } from 'redux';
import * as module from '../module';

let store;

describe('options module', () => {
  beforeEach(() => {
    store = createStore(module.reducer);
  });
  it('should update favoriteColor only', () => {
    expect(store.getState()).toEqual(module.INITIAL_STATE);
    store.dispatch(module.updateFavoriteColor('yellow'));
    expect(store.getState()).toEqual({ favoriteColor: 'yellow', likesColor: false });
  });
  it('should update likesColor only', () => {
    expect(store.getState()).toEqual(module.INITIAL_STATE);
    store.dispatch(module.updateLikesColor(true));
    expect(store.getState()).toEqual({ favoriteColor: 'red', likesColor: true });
  });
});
