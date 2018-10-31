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

	request() {		
		let xhttp = new XMLHttpRequest();
		xhttp.open('GET', this.url, true);
		xhttp.curr_coin = this.curr_coin;
		xhttp.onreadystatechange = function()  {
				if (this.readyState === 4 && this.status === 200) {
					let response = JSON.parse(this.responseText);
 					for (let coin in response)
							document.getElementById(this.curr_coin+'_'+coin
							).innerHTML = response[coin].USD;
				}
		}
		xhttp.send();
	}
	axios_request() {
		this.curr_coin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
		this.url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="+this.coins.join()+"&tsyms="+this.curr_coin;
		axios.get(this.url).then(res => {
			for (let coin in res.data) {
				let fontElement = document.getElementById('_'+coin)
				let oldValue = parseFloat(fontElement.innerHTML);
				fontElement.innerHTML = res.data[coin][this.curr_coin];
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