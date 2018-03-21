import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

const chrome = require('sinon-chrome');
const I18nPlugin = require('sinon-chrome/plugins').I18nPlugin;

import * as translations from '../resources/_locales/en/messages.json';

configure({ adapter: new Adapter() });

chrome.registerPlugin(new I18nPlugin(translations));

global['chrome'] = chrome;
