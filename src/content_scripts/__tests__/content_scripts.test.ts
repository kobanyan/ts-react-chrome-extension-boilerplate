import * as chrome from 'sinon-chrome';

describe('content_scripts', () => {
  beforeEach(() => {
    chrome.runtime.sendMessage.flush();
  });
  it('should', () => {
    expect(chrome.runtime.sendMessage.notCalled).toBe(true);
    require('../index');
    expect(chrome.runtime.sendMessage.calledOnce).toBe(true);
  });
});
