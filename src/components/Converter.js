import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react'; 
import './styles/converter.css';

export default function Converter() {

  const [html, setHTML] = useState('');
  const [jsx, setJSX] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  // const htmlEditor = useRef(null);
  const [alertVisisble, setAlertVisible] = useState(false);

  const handleHTML = function(event) {

    // let tempHTML = htmlEditor.current.editor.getContent();
    // tempHTML = tempHTML.slice(3, tempHTML.length - 4);
    // setHTML(tempHTML);

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
    
        console.log(output);
    
        setJSX(output);
  
        setIsConverting(false);
  
        copyJSXToClipBoard();
      }, 0);
    }
  }

  const copyJSXToClipBoard = function() {
    const jsxElement = document.getElementById('jsx-text');

    console.log(jsxElement);

    jsxElement.select();
    jsxElement.setSelectionRange(0, 99999); // for mobile

    document.execCommand('copy');

    // alert('copied!');

    setAlertVisible(true);

    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  return (
    <div className='converter'>

      {/* <Editor
        ref={htmlEditor}
        className='html-box'
        apiKey='l0viniayv3qyv11zsjsr6w1zww4cjptwt6wtrevdh7vadgg4'
        onKeyUp={(event) => handleHTML(event)}
        onKeyDown={(event) => handleHTML(event)}
        onPaste={(event) => handleHTML(event)}
        onChange={(event) => handleHTML(event)}
        // onChange={() => console.log('uh')}
        init={{
          width: '100%',
          height: '30vh',
          resize: false,
          elementpath: false,
          padding: '1em',
          margin: '0em',
          placeholder: 'Paste your html!',
          toolbar: '| undo redo |',
          menubar: '',
          body_class: 'html-text',
          content_style: 'div { margin: 10px; border: 5px solid red; padding: 3px; }'
        }}
      >

      </Editor> */}
      <textarea className='html-box' onChange={(element) => handleHTML(element)} placeholder='Paste your HTML!'></textarea>
      <div className={html && isConverting ? 'convert-button convert-button-working' : html && !isConverting ? 'convert-button' : !html ? 'convert-button convert-button-disabled' : 'convert-button'} onClick={() => handleConvert(html)}>{isConverting ? 'Converting...' : 
        <p>Convert HTML <span><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-narrow-right" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="15" y1="16" x2="19" y2="12" />  <line x1="15" y1="8" x2="19" y2="12" /></svg></span> JSX</p>
      }</div>

      <div className='output-container'>
        <textarea id='jsx-text' value={jsx} readOnly></textarea>
      </div>
      {alertVisisble ? 
        <div className='copy-alert'>JSX copied to clipboard!</div> :
        <div className='copy-alert alert-hidden'>JSX copied to clipboard!</div>
      }
    </div>
  );
};