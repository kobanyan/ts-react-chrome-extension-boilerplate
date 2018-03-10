import * as React from 'react';
import { PageAction } from '../PageAction';
import * as renderer from 'react-test-renderer';
const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins').I18nPlugin;

describe('Page Action', () => {
  beforeAll(() => {
    chrome.registerPlugin(new I18nPlugin({ pageAction: { message: 'mocked: pageAction' } }));
    global.chrome = chrome;
  });
  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
  it('should match snapshot', () => {
    const component = renderer.create(<PageAction />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
