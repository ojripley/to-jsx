import React, { useState } from 'react';
import './styles/converter.css';

export default function Converter() {

  const [html, setHTML] = useState('');
  const [jsx, setJSX] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [alertVisisble, setAlertVisible] = useState(false);

  const handleHTML = function(event) {
    setHTML(event.target.value);
  };

  const handleConvert = function(html) {
    if (html) {

      setIsConverting(true);
  
      setTimeout(() => {
  
        let output = html.split('');
    
        for (let i = html.length; i > 0; i--) {
    
          // identify properties by '='
          if (html[i] === '=') {
            let j = i - 1;
    
            // process the property
            while (html[j] !== ' ') {
              if (html[j] === '-') {
    
                // replace dash with camel case
                output.splice(j, 2, html[j + 1].toUpperCase());
              }
    
              // look ahead for property start
              if (html[j - 1] === ' ') {

                // skip over processed property. Saves time.
                i = j;
              }
              j--;
            }
          }
        }
    
        output = output.join('');
        output = output.replace(/class/, "className");
    
        setJSX(output);
        setIsConverting(false);

        const convertButton = document.querySelector('.convert-button');
        console.log(convertButton.getBoundingClientRect().top);

        window.scrollTo({top: convertButton.getBoundingClientRect().top + 50, behavior: "smooth"});
        // convertButton.scrollIntoView(true, { behavior: 'smooth'})
        copyJSXToClipBoard();
      }, 0);
    }
  }

  const copyJSXToClipBoard = function() {
    const jsxElement = document.getElementById('jsx-text');

    jsxElement.select();
    jsxElement.setSelectionRange(0, 99999); // for mobile

    document.execCommand('copy');

    // jsxElement.deselect();
    // window.getSelection().removeAllRanges();

    // alert('copied!');

    setAlertVisible(true);

    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    // <div className='converter'>
    <>
    {/* <p>Convert HTML to JSX by pasting/writing into the text area below.</p> */}
      <textarea className='html-box' onChange={(element) => handleHTML(element)} placeholder='Paste your HTML!'></textarea>
      <div className={html && isConverting ? 'convert-button convert-button-working' : html && !isConverting ? 'convert-button' : !html ? 'convert-button convert-button-disabled' : 'convert-button'} onClick={() => handleConvert(html)}>{isConverting ? 'Converting...' : 
        <p>Convert HTML <span><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="15" y1="16" x2="19" y2="12" />  <line x1="15" y1="8" x2="19" y2="12" /></svg></span> JSX</p>
      }</div>
      {jsx ? 
        <div className='output-container'>
          <textarea id='jsx-text' value={jsx} readOnly></textarea>
        </div> :
        null
      }
      {alertVisisble ? 
        <div className='copy-alert'>JSX copied to clipboard!</div> :
        <div className='copy-alert alert-hidden'>JSX copied to clipboard!</div>
      }
    </>
  );
};