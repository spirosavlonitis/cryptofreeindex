import React from 'react'
import Image from 'react-bootstrap/lib/Image'

const CoinInfo = ({ coinData, coinRow, }) => {
	return(
		<div className='row dash_row' >
			{ coinRow.map(coin =>
				<div className="col-md-4" key={coin.id+"_dashboard"} >
				  <div className="usd_field" >
						 <Image src={"/images/"+coin.image} className="home_price_image" />
				     <font className="home_price" id={"_"+coin.id} >
								{  1 || coinData[coin.id].USD }
				     </font>
				  </div>
			  </div>
			)}
		</div>
	)
}
export default CoinInfo;