import React, { Component } from 'react'
import './index.css'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Image from 'react-bootstrap/lib/Image'

class Top extends Component {
	render() {
		return (
			<Navbar inverse fuild>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="#home">CryptoFreeIndex</a>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
				  <Nav>
					<NavItem eventKey={1} href="#" className= 'active'>
					    <Image src= {"/images/usd.png"} className="NavImg" />USD
					</NavItem>
				  </Nav>
			 </Navbar.Collapse>
			</Navbar>
		)
	}
}


export default Top