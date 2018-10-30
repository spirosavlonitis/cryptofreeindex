class Ajax {

	constructor() {
		this.coins = [
				"BTC","LTC", "BCH", "ETH", "ETC", "ZEC", "DASH","XMR", "DCR",
			];
		this.curr_coin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
		
	}
}



export default Ajax