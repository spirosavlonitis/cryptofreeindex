import axios from 'axios'

export default class Ajax {

	constructor() {
		this.coins = [
				"USD", "EUR", "GBP", "BTC", "LTC", "BCH", "ETH", "ETC", "ZEC", 
				"DASH","XMR", "XRP", "REP", "BAT", "XLM"
			];
		this.fiatCurrencies = [ "USD", "EUR", "GBP", ]
		this.currentCoin = this.coins[document.getElementById("basic-nav-dropdown").tabIndex];
	}

	setValue(reset, fontElement, oldValue, newValue) {
		if (reset || oldValue === newValue )
			fontElement.style.color = "black";
		else  if (oldValue < newValue)
				fontElement.style.color = "green";
		else if (oldValue > newValue)
				fontElement.style.color = "red";
		fontElement.innerHTML = newValue;
	}

	fiatRequest(reset) {
			this.url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="+this.coins.join()+"&tsyms="+this.currentCoin;
			axios.get(this.url).then(res => {
				for (let coin in res.data) {
					let fontElement = document.getElementById('_'+coin)
					let oldValue = parseFloat(fontElement.innerHTML);
					let newValue = res.data[coin][this.currentCoin];
					this.setValue(reset, fontElement, oldValue, newValue);
				}
			})
	}

	cryptoRequest(reset) {
		this.url = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+this.currentCoin+"&tsyms="+this.coins.join();
		axios.get(this.url).then(res => {
			for (let coin in res.data['RAW'][this.currentCoin]) {
				let fontElement = document.getElementById('_'+coin);
				let oldValue = parseFloat(fontElement.innerHTML).toFixed(6);
				let newValue = res.data['RAW'][this.currentCoin][coin].PRICE.toFixed(6);
				this.setValue(reset, fontElement, oldValue, newValue);
			}
		});
	}

	dashBoardRequest(reset = false) {
		this.currentCoin = this.coins[document.getElementById("basic-nav-dropdown").tabIndex];
		if (this.fiatCurrencies.includes(this.currentCoin))
			 this.fiatRequest(reset);
		else
			this.cryptoRequest(reset);
	}

}