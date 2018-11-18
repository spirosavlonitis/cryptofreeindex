import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';

export default ({chartCoin, navCoins, onChange}) => {

	return(
		<div>
			<div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
			<Form>
				<FormControl componentClass="select" placeholder="select" value={chartCoin || ''}  onChange={onChange} >
					{ navCoins.map(item => 
						<option key={`${item}Option`} value={item}  >{item}</option>
					)  
					}
				</FormControl>
			</Form>
		</div>
	)
}

