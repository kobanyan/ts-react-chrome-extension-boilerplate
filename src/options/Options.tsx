import * as React from 'react';
import { Action } from 'redux';
import { connect, Dispatch } from 'react-redux';

import { RootState } from './store';
import { State, updateFavoriteColor, updateLikesColor } from './module';

interface OptionsProps {
  values: State;
  actions: ActionDispatcher;
}

class ActionDispatcher {
  constructor(private dispatch: (action: Action) => void) {}
  updateFavoriteColor(favoriteColor: string) {
    this.dispatch(updateFavoriteColor(favoriteColor));
  }
  updateLikesColor(likesColor: boolean) {
    this.dispatch(updateLikesColor(likesColor));
  }
}

const FavoriteColor: React.SFC<OptionsProps> = props => {
  return (
    <>
      {chrome.i18n.getMessage('optionsFavoriteColor')}
      <select
        id="color"
        value={props.values.favoriteColor}
        onChange={e => props.actions.updateFavoriteColor(e.currentTarget.value)}
      >
        <option value="red">{chrome.i18n.getMessage('optionsColorsRed')}</option>
        <option value="green">{chrome.i18n.getMessage('optionsColorsGreen')}</option>
        <option value="blue">{chrome.i18n.getMessage('optionsColorsBlue')}</option>
        <option value="yellow">{chrome.i18n.getMessage('optionsColorsYellow')}</option>
      </select>
    </>
  );
};

const LikesColor: React.SFC<OptionsProps> = props => {
  return (
    <label>
      <input
        type="checkbox"
        id="like"
        checked={props.values.likesColor}
        onChange={e => props.actions.updateLikesColor(e.currentTarget.checked)}
      />
      {chrome.i18n.getMessage('optionsLikesColor')}
    </label>
  );
};

const Options: React.SFC<OptionsProps> = props => {
  return (
    <section>
      <FavoriteColor {...props} />
      <LikesColor {...props} />
    </section>
  );
};

export const options = connect(
  (state: RootState) => ({ values: state.options }),
  (dispatch: Dispatch<Action>) => ({ actions: new ActionDispatcher(dispatch) })
)(Options);
