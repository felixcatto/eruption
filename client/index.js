import React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App';

hydrate(<App initialState={window.INITIAL_STATE} />, document.getElementById('root'));
