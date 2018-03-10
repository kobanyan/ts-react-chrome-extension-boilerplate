import * as chrome from 'sinon-chrome';

describe('content_scripts', () => {
  beforeAll(() => {
    global.chrome = chrome;
  });
  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
  beforeEach(() => {
    chrome.runtime.sendMessage.flush();
  });
  it('should', () => {
    expect(chrome.runtime.sendMessage.notCalled).toBe(true);
    require('../index');
    expect(chrome.runtime.sendMessage.calledOnce).toBe(true);
  });
});
