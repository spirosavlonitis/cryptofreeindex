import React, { Component } from 'react'
import Image from 'react-bootstrap/lib/Image'


export default class CoinInfo extends Component {
	render() {
		const { coinData, coinRow, } = this.props;
		return (
			<div className='row dash_row' >
				{ coinRow.map(coin =>
					<div className="col-md-4" key={coin.id+"_dashboard"} >
					  <div className="usd_field" >
							 <Image src={"/images/"+coin.image} className="home_price_image" />
					     <font className="home_price" id={"_"+coin.id} >
									{ coinData[coin.id] ? coinData[coin.id].USD : 0 }
					     </font>
					  </div>
				  </div>
				)}
			</div>
		);
	}
}