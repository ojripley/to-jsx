import React from 'react';

import Converter from './components/Converter';

import './components/styles/app.css';

function App() {
  return (
    <div className='app'>
      <div className='header'>
        <p className='header-text'>to-JSX</p></div>
      <Converter></Converter>
    </div>
  );
}

export default App;
