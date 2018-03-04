import * as React from 'react';
import * as ReactDOM from 'react-dom';

const PageAction = () => {
  return (
    <div>
      <p>{chrome.i18n.getMessage('pageAction')}</p>
    </div>
  );
};

ReactDOM.render(<PageAction />, document.getElementById('app'));
