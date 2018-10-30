import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Top from './top'
import App from './App';
import Consent from './consent'
import Ajax from './ajax'
import * as serviceWorker from './serviceWorker';

ReactDOM.render([<Top />, <App />, <Consent />], document.getElementById('root'));

if (module.hot)
	module.hot.accept();

serviceWorker.unregister();

const ajax = new Ajax();
let dashBoardTimer = undefined;

if (typeof dashBoardTimer != 'undefined') {
	clearInterval(dashBoardTimer);
	dashBoardTimer = undefined;
}

if (typeof dashBoardTimer == 'undefined')
	dashBoardTimer = setInterval( function(){ ajax.request() }, 30000);