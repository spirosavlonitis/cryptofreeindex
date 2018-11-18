import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Chart from './index.js'


describe('Chart', () => {

	const props = {
		navCoins: [ 
				'USD', 'EUR', 'GBP', 'BTC', 'LTC', 'BCH', 'ETH',
  			'ETC', 'ZEC', 'DASH', 'XMR', 'DCR' 
  	],
  	chartCoin: 'BTC',
  	activeKey: 0,
  	onChange: () => 'foo',
	};

	it('renders without crashing', () =>{
		const div = document.createElement('div');
		ReactDOM.render(<Chart {...props} />, div);
		ReactDOM.unmountComponentAtNode(div);
	})

	test('snapshot', ()=>{
		const element = renderer.create(<Chart {...props} />);
		let tree = element.toJSON();
		expect(tree).toMatchSnapshot();
	})

})