import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import DashBoard from './index.js'

describe('DashBoard', () => {
	const props = {
		activeKey: 0,
		navCoins:[
			"USD", "EUR", "GBP", "BTC", "LTC", "BCH", "ETH", 
			"ETC", "ZEC", "DASH", "XMR", "DCR"
		],
		coinData: {
		  "USD": {
		    "USD": 1, "EUR": 1.14, "GBP": 1.27, "BTC": 5606.49, "LTC": 42.22,
		    "BCH": 346.1, "ETH": 176.28, "ETC": 7.47, "ZEC": 113.57, "DASH": 133.94,
		    "XMR": 90.41,  "DCR": 33.81
  		}
		},
		coinCols: [
		  [
		    { "id": "USD", "color": "#339933", "image": "USD_Logo.png" },
		    { "id": "BTC", "color": "#f2a900", "image": "BTC_Logo.png" },
		    { "id": "ETH", "color": "#3385ff", "image": "ETH_Logo.png" },
		    { "id": "DASH","color": "#2075bc", "image": "DASH_Logo.png"}
		  ],
		  [
		    { "id": "EUR","color": "", "image": "EUR_Logo.svg" },
		    { "id": "LTC", "color": "#d3d3d3", "image": "LTC_Logo.png" },
		    { "id": "ETC", "color": "#669073", "image": "ETC_Logo.svg" },
		    { "id": "XMR", "color": "#ff6600", "image": "XMR_Logo.png" }
		  ],
		  [
		    { "id": "GBP", "color": "", "image": "GBP_Logo.png" },
		    { "id": "BCH", "color": "#4cca47", "image": "BCH_Logo.png" },
		    { "id": "ZEC", "color": "#f4b728", "image": "ZEC_Logo.svg" },
		    { "id": "XRP", "color": "#62D0C9", "image": "xrp-symbol-white-128.png" }
		  ]
		]
	}

	it('renders without crashing', () =>{
		const div = document.createElement('div');
		ReactDOM.render(<DashBoard {...props} />, div)
		ReactDOM.unmountComponentAtNode(div);
	});

	test('snapshot', () =>{
		const element = renderer.create(<DashBoard {...props} />);
		const tree = element.toJSON();
		expect(tree).toMatchSnapshot();
	});


})
