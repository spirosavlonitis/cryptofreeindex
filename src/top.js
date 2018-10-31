import React, { Component } from 'react'
import './index.css'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Image from 'react-bootstrap/lib/Image'
import Ajax from './ajax'

class Top extends Component {

	constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

	state = {
	   	activeKey: 1,
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
					<NavItem eventKey={1} href="#" >
					    <Image src= {"/images/usd.png"} className="NavImg" id="USD" />USD
					</NavItem>
					<NavItem eventKey={2} href="#">
					    <Image src= {"/images/EUR_Gold_Logo.svg"} className="NavImg" id="EUR" />EUR
					</NavItem>
				  </Nav>
			 </Navbar.Collapse>
			</Navbar>
		)
	}

}


export default Top