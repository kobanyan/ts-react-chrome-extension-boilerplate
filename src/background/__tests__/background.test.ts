import * as chrome from 'sinon-chrome';

describe('background', () => {
  beforeAll(() => {
    global.chrome = chrome;
  });
  afterAll(() => {
    chrome.flush();
    delete global.chrome;
  });
  beforeEach(() => {
    chrome.runtime.sendMessage.flush();
    chrome.pageAction.show.flush();
  });
  it('should add listner', () => {
    expect(chrome.runtime.onMessage.addListener.notCalled).toBe(true);
    require('../index');
    expect(chrome.runtime.onMessage.addListener.calledOnce).toBe(true);
  });
  it('should call chrome.pageAction with tab.id', () => {
    expect(chrome.pageAction.show.notCalled).toBe(true);
    const tabId = '1';
    chrome.runtime.onMessage.dispatch(null, { tab: { id: tabId } }, (res: {}) => {
      expect(res).toBeNull();
    });
    expect(chrome.pageAction.show.withArgs(tabId).calledOnce).toBe(true);
  });
  it('should not call chrome.pageAction', () => {
    expect(chrome.pageAction.show.notCalled).toBe(true);
    chrome.runtime.onMessage.dispatch(null, { tab: null }, (res: {}) => {
      fail('should not have response');
    });
    expect(chrome.pageAction.show.notCalled).toBe(true);
  });
});
