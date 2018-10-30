import React, { Component } from 'react';
import CookieConsent from "react-cookie-consent";

class Consent extends Component {
	render() {
		return (
				<CookieConsent>
				   This website uses cookies to enhance the user experience.
				</CookieConsent>
			)
	}
}

export default Consent