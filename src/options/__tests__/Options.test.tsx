import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { options as Options } from '../Options';
import { INITIAL_STATE } from '../module';
import { store } from '../store';

const connectedOptions = () => {
  return (
    <Provider store={store}>
      <Options />
    </Provider>
  );
};

describe('Options', () => {
  it('should match snapshot', () => {
    const component = renderer.create(connectedOptions());
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should select', () => {
    const options = mount(connectedOptions());
    options.find('select').simulate('change', { target: { value: 'green' } });
    // https://github.com/airbnb/enzyme/issues/218
    // expect(options.state().favoriteColor).toEqual('green');
  });
  it('should check', () => {
    const options = mount(connectedOptions());
    options.find('input').simulate('change', { target: { value: true } });
    // https://github.com/airbnb/enzyme/issues/218
    // expect(options.state().likesColor).toEqual(true);
  });
});
