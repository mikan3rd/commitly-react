import React from 'react';

import { Props } from '../../containers/App';

import logo from './logo.svg';
import './App.css';

const App: React.FC<Props> = props => {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <input value={props.appState.name} onChange={e => props.changeName(e.target.value)} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
