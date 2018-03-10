import * as React from 'react';
import { Options } from '../Options';
import * as renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme';
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins').I18nPlugin;

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
    const component = renderer.create(<Options />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should select', () => {
    const options = mount(<Options />);
    options.find('select').simulate('change', { target: { value: 'green' } });
    // https://github.com/airbnb/enzyme/issues/218
    // expect(options.state().favoriteColor).toEqual('green');
  });
  it('should check', () => {
    const options = mount(<Options />);
    options.find('input').simulate('change', { target: { value: true } });
    // https://github.com/airbnb/enzyme/issues/218
    // expect(options.state().likesColor).toEqual(true);
  });
  it('should save', () => {
    const options = mount(<Options />);
    options.find('button').simulate('click');
  });
});
