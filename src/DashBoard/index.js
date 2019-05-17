import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/lib/Image'

const DashBoard = ({coinData, coinCols, navCoins, activeKey}) => {
try{		/* Deal with multiple navbar clicks */
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
}catch (e) {
	return null;
}

}

DashBoard.propTypes = {
	coinData: PropTypes.shape({
		USD: PropTypes.shape({
			USD: PropTypes.number.isRequired,
			EUR: PropTypes.number.isRequired,
			GBP: PropTypes.number.isRequired,
		  	BTC: PropTypes.number.isRequired,
		  	LTC: PropTypes.number.isRequired,
			BCH: PropTypes.number.isRequired,
			ETH: PropTypes.number.isRequired,
			ETC: PropTypes.number.isRequired,
			ZEC: PropTypes.number.isRequired,
			DASH: PropTypes.number.isRequired,
			XMR: PropTypes.number.isRequired,
			XRP: PropTypes.number.isRequired,
			REP: PropTypes.number.isRequired,
			BAT: PropTypes.number.isRequired,
			XLM: PropTypes.number.isRequired,
		}),
	}),
	coinCols: PropTypes.arrayOf(
		PropTypes.arrayOf(
			PropTypes.shape({
					id: PropTypes.string.isRequired,
					color: PropTypes.string.isRequired,
					image: PropTypes.string.isRequired,
			})
		)
	).isRequired,
	navCoins: PropTypes.array.isRequired,
	activeKey: PropTypes.number,
}

export default DashBoard;


