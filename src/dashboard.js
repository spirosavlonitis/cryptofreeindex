import React, { Component } from 'react'
import Image from 'react-bootstrap/lib/Image'

class DashBoard extends Component {
	render() {
		return (
			<div className='row' >
				<div className="col-md-4">
				  <div className="usd_field" >
						 <Image src= {"/images/BTC_Logo.png"} className="home_price_image"  />
				     <font className="home_price" id="usd_BTC" ></font>
				  </div>
			  </div>
			</div>
		)
	}
}


export default DashBoard