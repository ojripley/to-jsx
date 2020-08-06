import React from 'react';

import './styles/controlBar.css';

export default function ControlBar() {

  return(
    <p className='control-bar'>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>

      <p className='control-item'>test</p>
      <p className='control-item'>test</p>
      <p className='control-item'>test</p>
      <p className='control-item'>test</p>
      <p className='control-item'>test</p>
    </p>
  );
};