import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as chrome from 'sinon-chrome';

import * as translations from '../resources/_locales/en/messages.json';

configure({ adapter: new Adapter() });

chrome.registerPlugin(new chrome.plugins.I18nPlugin(translations));

global['chrome'] = chrome;
