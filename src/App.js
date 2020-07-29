import React from 'react';

import Converter from './components/Converter';

import './components/styles/app.css';

function App() {
  return (
    <div className='app'>
      <div className='header'>
        <p className='header-text'>to-JSX</p>

        <p className='header-author'>Created By: <span><a className='author-link' href='https://ojripley.com/' target='_blank' rel='noopener noreferrer'>Owen Ripley</a></span></p>
      </div>
      <Converter></Converter>
    </div>
  );
}

export default App;
