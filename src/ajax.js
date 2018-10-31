import axios from 'axios'

class Ajax {

	constructor() {
		this.coins = [
				"USD", "EUR", "GBP", "BTC", "LTC", "BCH", "ETH", "ETC", "ZEC", 
				"DASH","XMR", "DCR",
			];
		this.curr_coin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
		this.url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="+this.coins.join()+"&tsyms="+this.curr_coin;
	}

	dashBoardRequest(reset = false) {
		this.curr_coin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
		this.url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="+this.coins.join()+"&tsyms="+this.curr_coin;
		axios.get(this.url).then(res => {
			for (let coin in res.data) {
				let fontElement = document.getElementById('_'+coin)
				let oldValue = parseFloat(fontElement.innerHTML);
				fontElement.innerHTML = res.data[coin][this.curr_coin];
				if (reset)
					fontElement.style.color = "black";
				else
					if (oldValue < res.data[coin][this.curr_coin])
						fontElement.style.color = "green";
					else if (oldValue > res.data[coin][this.curr_coin])
						fontElement.style.color = "red";
					else
						fontElement.style.color = "black";

			}
		})
	}
}

export default Ajax