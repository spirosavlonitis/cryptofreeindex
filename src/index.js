import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Top from './Top'
import App from './App'
import Consent from './consent'
import Ajax from './Ajax'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Top />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<Consent />, document.getElementById('consent'));

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
	dashBoardTimer = setInterval( function(){ ajax.dashBoardRequest() }, 30000);