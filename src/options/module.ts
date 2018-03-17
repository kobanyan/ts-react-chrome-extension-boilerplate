import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
const actionCreator = actionCreatorFactory();

export interface State {
  favoriteColor: string;
  likesColor: boolean;
}

export const INITIAL_STATE: State = {
  favoriteColor: 'red',
  likesColor: false,
};

export const updateFavoriteColor = actionCreator<string>('UPDATE_FAVORITE_COLOR');
export const updateLikesColor = actionCreator<boolean>('UPDATE_LIKES_COLOR');

export const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(updateFavoriteColor, (state, favoriteColor) => ({ ...state, favoriteColor }))
  .case(updateLikesColor, (state, likesColor) => ({ ...state, likesColor }))
  .build();
