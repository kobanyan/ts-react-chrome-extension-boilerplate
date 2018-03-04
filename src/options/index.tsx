import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface OptionsState {
  favoriteColor: string;
  likesColor: boolean;
  status: string;
}

class Options extends React.Component<{}, OptionsState> {
  constructor() {
    super();
    this.state = {
      favoriteColor: 'red',
      likesColor: false,
      status: '',
    };
  }
  componentDidMount() {
    chrome.storage.sync.get(
      {
        favoriteColor: 'red',
        likesColor: false,
      },
      items => {
        this.setState({
          favoriteColor: items.favoriteColor,
          likesColor: items.likesColor,
        });
      }
    );
  }
  changeFavoliteColor(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      favoriteColor: event.currentTarget.value,
    });
  }
  changeLikesColor(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      likesColor: event.currentTarget.checked,
    });
  }
  save(event: React.MouseEvent<HTMLButtonElement>) {
    chrome.storage.sync.set(
      {
        favoriteColor: this.state.favoriteColor,
        likesColor: this.state.likesColor,
      },
      () => {
        // Update status to let user know options were saved.
        this.setState({
          status: chrome.i18n.getMessage('optionsStatus'),
        });
        setTimeout(() => {
          this.setState({
            status: '',
          });
        }, 750);
      }
    );
  }
  render() {
    return (
      <section>
        {chrome.i18n.getMessage('optionsFavoriteColor')}
        <select id="color" value={this.state.favoriteColor} onChange={e => this.changeFavoliteColor(e)}>
          <option value="red">{chrome.i18n.getMessage('optionsColorsRed')}</option>
          <option value="green">{chrome.i18n.getMessage('optionsColorsGreen')}</option>
          <option value="blue">{chrome.i18n.getMessage('optionsColorsBlue')}</option>
          <option value="yellow">{chrome.i18n.getMessage('optionsColorsYellow')}</option>
        </select>
        <label>
          <input type="checkbox" id="like" checked={this.state.likesColor} onChange={e => this.changeLikesColor(e)} />
          {chrome.i18n.getMessage('optionsLikesColor')}
        </label>
        <div id="status">{this.state.status}</div>
        <button id="save" onClick={e => this.save(e)}>
          {chrome.i18n.getMessage('optionsSave')}
        </button>
      </section>
    );
  }
}

ReactDOM.render(<Options />, document.getElementById('app'));
