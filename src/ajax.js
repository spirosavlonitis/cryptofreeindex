class Ajax {

	constructor() {
		this.coins = [
				"BTC","LTC", "BCH", "ETH", "ETC", "ZEC", "DASH","XMR", "DCR",
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
}



export default Ajax