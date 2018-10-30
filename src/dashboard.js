import React, { Component } from 'react'
import Image from 'react-bootstrap/lib/Image'
import './dashboard.css'

const coins = [
	[
		{ id: "BTC", image: "BTC_Logo.png" }, 
		{ id: "LTC", image: "LTC_Logo.png" }, 
		{ id: "BCH", image: "BCH_Logo.png" },
	],
	[
		{ id: "ETH", image: "ETH_Logo.png" }, 
		{ id: "ETC", image: "ETC_Logo.svg" }, 
		{ id: "ZEC", image: "ZEC_Logo.png" },		
	],
	[
		{ id: "DASH", image: "DASH_Logo.png" }, 	
		{ id: "XMR", image: "XMR_Logo.png" }, 	
		{ id: "DCR", image: "DCR_Logo.png" }, 	
	],
];

let curr_coin = "usd";

class DashBoard extends Component {
	render() {
		return (
			<div>
				{ coins.map(coin_row =>
					<div className='row dash_row' >
						{ coin_row.map(coin =>
							<div className="col-md-4" key={coin.id+"_dashboard"} >
							  <div className="usd_field" >
									 <Image src={"/images/"+coin.image} className="home_price_image" />
							     <font className="home_price" id={curr_coin+"_"+coin.id} ></font>
							  </div>
						  </div>
						)}
					</div>
				)}
			</div>
		);
	}
}


export default DashBoard