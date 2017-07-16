chrome.runtime.sendMessage({}, response => {
  const readyStateCheckInterval = setInterval(
    () => {
      if (document.readyState === 'complete') {
        clearInterval(readyStateCheckInterval);
        console.log('Hello. This message was sent from content_scripts/index.ts');
      }
    },
    10);
});
