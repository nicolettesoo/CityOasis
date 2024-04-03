import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx'
import { createRoot } from 'react-dom/client'
import styles from './stylesheets/styles.css';
import Modal from 'react-modal';

//Modal.setAppElement('#root');


const root = createRoot(document.getElementById('root'))
console.log(root)
root.render(<App/>)