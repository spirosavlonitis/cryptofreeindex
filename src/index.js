import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Ajax from './Ajax'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('app'));


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
