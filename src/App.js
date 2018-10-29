import React, { Component } from 'react';
import './App.css';
import Dashboard from './dashboard'
import Image from 'react-bootstrap/lib/Image'

class App extends Component {
  render() {
    return (
        <div className="container" >
        	<div className="row" >
					<div className="col-md-12" >
						<ul className="nav nav-tabs">
						  <li className="nav active"><a data-toggle="tab" href="#dashboard">Dashboard</a></li>
						  <li className="nav"><a data-toggle="tab" href="#statistics">Statistics</a></li>
						</ul>
						<div className="tab-content" >
							<div className="tab-pane fade in active" id="dashboard" >
									{<Dashboard />}
							</div>
						</div>
					</div>
        	</div>
        </div>      
    );
  }
}

export default App;
