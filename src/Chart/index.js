import React from 'react';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Radio from 'react-bootstrap/lib/Radio'

export default ({chartCoin, navCoins, onCoinChange, onDaysChange, activeKey, chartDays}) => {
	const navCoin = coin => coin !== navCoins[activeKey];
	const days = [
			[7, "1 Week"], [30,"1 Month"], [90, "3 Months"], [180, "6 Months"], 
			[365, "1 Year"],
	]

	return(
		<div>
			<div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
			<Form>
				{days.map(item => 
					<Radio
						key={`${item[0]}Radio`} 
						name="daysGroup" 
						value={item[0]}
						checked= {item[0] === chartDays ?  'checked' : '' }
						onChange={onDaysChange}
						inline 
					>
						{item[1]}
					</Radio>
					)
				}
				<FormControl 
					componentClass="select" 
					placeholder="select" 
					value={chartCoin || ''}  
					onChange={onCoinChange} 
				>
					{ navCoins.filter(navCoin).map(item => 
							<option key={`${item}Option`} value={item}  >{item}</option>
						)  
					}
				</FormControl>
			</Form>
		</div>
	)
}

