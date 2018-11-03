import React, { Component } from 'react';
import './App.css';
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import DashBoard from './Dashboard'
import Statistics from './Statistics'

class App extends Component {

	componentDidMount() {
		/* TODO */
	}

	componentWillUnmount() {
		/*  TODO */
	}

  render() {
    return (
        <div className="container" >
        	<div className="row" >
					<div className="col-md-12" >
						<Tabs defaultActiveKey={1} id="uncontrolled-tab-example" >
							<Tab eventKey={1} title="Dashboard" >
								{ <DashBoard /> }
							</Tab>
							<Tab eventKey={2} title="Statistics" >
								{ <Statistics /> }
							</Tab>
						</Tabs>
					</div>
        	</div>
        </div>      
    );
  }
}

export default App;
