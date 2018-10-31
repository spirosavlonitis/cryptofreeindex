import axios from 'axios'

class Ajax {

	constructor() {
		this.coins = [
				"USD", "EUR", "GBP", "BTC", "LTC", "BCH", "ETH", "ETC", "ZEC", 
				"DASH","XMR", "DCR",
			];
		this.fiatCurrencies = [ "USD", "EUR", "GBP", ]
		this.currentCoin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
		this.url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="+this.coins.join()+"&tsyms="+this.curr_coin;
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
		
	}

	dashBoardRequest(reset = false) {
		this.currentCoin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
		if (this.fiatCurrencies.includes(this.currentCoin))
			 this.fiatRequest(reset);
		else
			this.cryptoRequest(reset);
	}
}

export default Ajax