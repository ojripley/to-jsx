import React, { useState } from 'react';

import Converter from './components/Converter';
import ControlBar from './components/ControlBar';

import './components/styles/app.css';

function App() {

  const [mode, setMode] = useState('toJSX');

  return (
    <div className='app'>
      <div className='header'>
        <p className='header-text'>to-JSX</p>
        <p className='header-author'>Created By: <span><a className='author-link' href='https://ojripley.com/' target='_blank' rel='noopener noreferrer'>Owen Ripley</a></span></p>
      </div>

      <div className='page-container'>
        <ControlBar></ControlBar>
        <Converter></Converter>
      </div>

    </div>
  );
}

export default App;
