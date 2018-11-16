import React from 'react'
import ReactDOM from 'react-dom'
import Statistics from './index.js'

describe('Statistics', () => {

	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Statistics />, div);
		ReactDOM.unMountNoteAt(div);
	});

})