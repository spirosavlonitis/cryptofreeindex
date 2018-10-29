import React, { Component } from 'react';
import './App.css';
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
								<div className='row' >
									<div className="col-md-4">
									  <div className="usd_field" >
											 <Image src= {"/images/BTC_Logo.png"} className="home_price_image"  />
									     <font className="home_price" id="usd_BTC" ></font>
									  </div>
								  </div>
								</div>
							</div>
						</div>
					</div>
        	</div>
        </div>      
    );
  }
}

export default App;
