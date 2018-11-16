import React, { Component } from 'react';
import './App.css';
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import DashBoard from './DashBoard'
import Statistics from './Statistics'

export default class App extends Component {
  render() {
    return (
        <div className="container" >
        	<div className="row" >
					<div className="col-md-12" >
						<Tabs defaultActiveKey={1} id="uncontrolled-tab-example" >
							<Tab eventKey={1} title="Dashboard">
								<DashBoard />
							</Tab>
							<Tab eventKey={2} title="Statistics">								
								<div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
								<Statistics />
							</Tab>
						</Tabs>
					</div>
        	</div>
        </div>      
    );
  }
}