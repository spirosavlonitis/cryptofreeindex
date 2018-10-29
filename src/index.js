import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Top from './top'
import App from './App';
import Consent from './consent'
import * as serviceWorker from './serviceWorker';

ReactDOM.render([<Top />, <App />, <Consent />], document.getElementById('root'));

if (module.hot)
	module.hot.accept();

serviceWorker.unregister();
