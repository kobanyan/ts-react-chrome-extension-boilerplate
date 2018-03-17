import * as React from 'react';
import { Provider } from 'react-redux';
import * as renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins').I18nPlugin;
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
  beforeAll(() => {
    configure({ adapter: new Adapter() });
    chrome.registerPlugin(
      new I18nPlugin({
        optionsFavoriteColor: { message: 'mocked: optionsFavoriteColor' },
        optionsColorsRed: { message: 'mocked: optionsColorsRed' },
        optionsColorsGreen: { message: 'mocked: optionsColorsGreen' },
        optionsColorsBlue: { message: 'mocked: optionsColorsBlue' },
        optionsColorsYellow: { message: 'mocked: optionsColorsYellow' },
        optionsLikesColor: { message: 'mocked: optionsLikesColor' },
        optionsSave: { message: 'mocked: optionsSave' },
        optionsStatus: { message: 'mocked: optionsStatus' },
      })
    );
    global.chrome = chrome;
  });
  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
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
