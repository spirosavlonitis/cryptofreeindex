import React, { Component } from 'react'
import CoinInfo from '../CoinInfo'

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
	
	render() {
		const {coinData} = this.props;
		return (
			<div>
				{coinData && coins.map((coinRow, index) =>
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