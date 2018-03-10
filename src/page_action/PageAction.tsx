import * as React from 'react';

export const PageAction = () => {
  return (
    <div>
      <p>{chrome.i18n.getMessage('pageAction')}</p>
    </div>
  );
};
