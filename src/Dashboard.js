import React, { Component } from 'react'
import Image from 'react-bootstrap/lib/Image'
import axios from 'axios'

const coins = [
	[
		{ id: "USD", image: "USD_Logo.png" }, 
		{ id: "EUR", image: "EUR_Logo.svg" },
		{ id: "GBP", image: "GBP_Logo.png" }, 
	],

	[
		{ id: "BTC", image: "BTC_Logo.png" }, 
		{ id: "LTC", image: "LTC_Logo.png" }, 
		{ id: "BCH", image: "BCH_Logo.png" },
	],
	[
		{ id: "ETH", image: "ETH_Logo.png" }, 
		{ id: "ETC", image: "ETC_Logo.svg" }, 
		{ id: "ZEC", image: "ZEC_Logo.svg" },		
	],
	[
		{ id: "DASH", image: "DASH_Logo.png" }, 	
		{ id: "XMR", image: "XMR_Logo.png" }, 	
		{ id: "DCR", image: "DCR_Logo.png" }, 	
	],
];

const coin_list = coins.map(coin_row => coin_row.map(coin => coin.id)).flat();
let curr_coin = "USD";

class DashBoard extends Component {
	
	state = {
		coinData: {}
	}

	componentDidMount() {
		let url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="+coin_list.join()+"&tsyms="+curr_coin;
		axios.get(url).then(res => {
			 const coinData = res.data
			 this.setState({ coinData });
			})
	}

	render() {
		return (
			<div>
				{ coins.map((coin_row, index) =>
					<div className='row dash_row' key={"row_"+index} >
						{ coin_row.map(coin =>
							<div className="col-md-4" key={coin.id+"_dashboard"} >
							  <div className="usd_field" >
									 <Image src={"/images/"+coin.image} className="home_price_image" />
							     <font className="home_price" id={"_"+coin.id} >
											{ this.state.coinData[coin.id] ? this.state.coinData[coin.id].USD : 0 }
							     </font>
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