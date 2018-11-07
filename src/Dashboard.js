import React, { Component } from 'react'
import CoinInfo from './CoinInfo'
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

class DashBoard extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
					coinData: {}
		};
		this.coin_list = coins.map(coin_row => coin_row.map(coin => coin.id)).flat();
		this.curr_coin = "USD";
	}

	componentDidMount() {
		let url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="+this.coin_list.join()+"&tsyms="+this.curr_coin;
		axios.get(url).then(res => {
			 this.setState({ coinData: res.data });
		});
	}

	render() {
		const {coinData} = this.state;
		return (
			<div>
				{ coins.map((coinRow, index) =>
					<CoinInfo 
						coinData={coinData}
						coinRow={coinRow}
						key={"row_"+index}
					/>
				)}
			</div>
		);
	}
}


export default DashBoard