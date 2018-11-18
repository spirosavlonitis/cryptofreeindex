import React from 'react'
import Image from 'react-bootstrap/lib/Image'


const DashBoard = ({coinData, coinCols, navCoins, activeKey}) => {
	return(
		<div>
			{coinCols.map((coinCol, index) =>
				<div className="col-md-4" key={index+"_dashboard"} >
					{coinCol.map( coin => 
						  <div className="usd_field" key={'col'+coin.id} >
						  	 <br/>
								 <Image src={"/images/"+coin.image} className="home_price_image" />
						     <font className="home_price" id={"_"+coin.id} >
										{ coinData[navCoins[activeKey]][coin.id] }
						     </font>
						  </div>
					)}
			  </div>
			)}
		</div>
	)
}
export default DashBoard;