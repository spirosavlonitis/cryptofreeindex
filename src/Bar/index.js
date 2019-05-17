import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Image from 'react-bootstrap/lib/Image';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';

const Bar = ({activeKey, coins, onSelect}) => {

	return(
		<Navbar inverse >
		  <Navbar.Header>
		    <Navbar.Brand >
		      <a href="#home">CryptoFreeIndex</a>
		    </Navbar.Brand>
		    <Navbar.Toggle />
		  </Navbar.Header>
		  <Navbar.Collapse>
			  <Nav activeKey={activeKey } onSelect={onSelect}>
				<NavDropdown title="Coins" id="basic-nav-dropdown">
				{ coins.map((coin, index) =>
						<NavItem eventKey={index} href="#" id={index} key={"NavItem"+coin.id} >
						  <Image src= {"images/"+coin.image} className="NavImg" />{coin.id}
						</NavItem>
					)}
		      	</NavDropdown>		 
				</Nav>
		 </Navbar.Collapse>
	</Navbar>
	)
}

export default Bar;