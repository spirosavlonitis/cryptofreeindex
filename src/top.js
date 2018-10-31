import React, { Component } from 'react'
import './index.css'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Image from 'react-bootstrap/lib/Image'
import Ajax from './ajax'

const coins = [
		{ id: "USD", image: "USD_Logo.png" }, 
		{ id: "EUR", image: "EUR_Logo.svg" },
		{ id: "GBP", image: "GBP_Logo.png" }, 
		{ id: "BTC", image: "BTC_Logo.png" }, 
		{ id: "LTC", image: "LTC_Logo.png" }, 
		{ id: "BCH", image: "BCH_Logo.png" },
		{ id: "ETH", image: "ETH_Logo.png" }, 
		{ id: "ETC", image: "ETC_Logo.svg" }, 
		{ id: "ZEC", image: "ZEC_Logo.png" },		
		{ id: "DASH", image: "DASH_Logo.png" }, 	
		{ id: "XMR", image: "XMR_Logo.png" }, 	
		{ id: "DCR", image: "DCR_Logo.png" }, 	
];

class Top extends Component {

	constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

	state = {
	   	activeKey: 0,
	}
	
	handleSelect(key) {
    this.setState({ activeKey: key }, () => {
    	new Ajax().dashBoardRequest(true);
    });
	}

	render() {
		return (
			<Navbar inverse >
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="#home">CryptoFreeIndex</a>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
				  <Nav activeKey={this.state.activeKey } onSelect={this.handleSelect} >
					{ coins.map((coin, index) =>
							<NavItem eventKey={index} href="#" id={index} >
							  <Image src= {"images/"+coin.image} className="NavImg" />{coin.id}
							</NavItem>
						)}
					</Nav>
			 </Navbar.Collapse>
			</Navbar>
		)
	}

}


export default Top