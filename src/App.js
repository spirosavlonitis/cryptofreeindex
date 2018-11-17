import React, { Component } from 'react';
import './App.css';
import TopBarProgress from "react-topbar-progress-indicator";
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';
import Bar from './Bar'
import DashBoard from './DashBoard'
import Loading from './Loading'

am4core.useTheme(am4themes_animated);

TopBarProgress.config({
  barColors: {
    "0": "#f00",
    "1.0": "#ff5050",
  },
  shadowBlur: 5,
});

export default class App extends Component {
	constructor(props) {
    super(props);
    this.coins = [
    		{ id: "USD", color: "#339933", image: "USD_Logo.png" },
				{ id: "EUR", color: "", image: "EUR_Logo.svg" },
				{ id: "GBP", color: "", image: "GBP_Logo.png" },
				{ id: "BTC", color: "#f2a900", image: "BTC_Logo.png"}, 
				{ id: "LTC", color: "#d3d3d3", image: "LTC_Logo.png"}, 
				{ id: "BCH", color: "#4cca47", image: "BCH_Logo.png"},
				{ id: "ETH", color: "#3385ff", image: "ETH_Logo.png"}, 
				{ id: "ETC", color: "#669073", image: "ETC_Logo.svg"}, 
				{ id: "ZEC", color: "#f4b728", image: "ZEC_Logo.svg"},		
				{ id: "DASH", color: "#2075bc", image: "DASH_Logo.png"}, 	
				{ id: "XMR",	color: "#ff6600", image: "XMR_Logo.png"}, 	
				{ id: "DCR",	color: "#62D0C9", image: "DCR_Logo.png" },
		];
    this.state 	= {
		   	activeKey: 0,
		   	chart: undefined,
		   	coinData: false,
		   	isLoading: false,
				navCoins: this.coins.map(coin => coin.id),
		};
    
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentCleanup() {
    let { chart, } = this.state;
    if (chart)
     chart.dispose();
    else
      console.log("this.state.chart is undefined !!");
  }

  chartSettings(chart, coin) {
    chart.paddingRight = 20;
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 60;

    let scrollbarX = new am4charts.XYChartScrollbar();
    /* add coin to chart and scrobarX series  */
    let series = chart.series.push(new am4charts.LineSeries());
    series.name = coin;
    series.dataFields.dateX = "date";
    series.dataFields.valueY = coin;
  	
  	const color = this.coins.filter(item => item.id === coin)[0].color;
	  series.fill = am4core.color(color);
    series.stroke = am4core.color(color);
    series.tooltipText = "{valueY.value}";
    scrollbarX.series.push(series);

    chart.cursor = new am4charts.XYCursor();
    chart.scrollbarX = scrollbarX;
    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;
  }

  setChart(coin, res, days) {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    this.chartSettings(chart, coin);          
    chart.data = [];
    try {
        for (var i = 0; i < days+1; i++)
          chart.data[i] = {
            date: new Date(res.data.Data[i].time*1000),
            [coin]: res.data.Data[i].close
          };
    }catch(e) {
      alert("Error while getting chart data!!");
      chart.data = [];
      console.log(e)
    }
    this.setState({ chart, isLoading: null });
  }

  getChartData(coin, key ,days=365) {
  	const {navCoins} = this.state;
	  let url;

	  if(key < 3)
	    url = "https://min-api.cryptocompare.com/data/histoday?fsym="+coin+"&tsym="+navCoins[key]+"&limit="+days+"&aggregate=1&e=CCCAGG";
	  else
	    url = "https://min-api.cryptocompare.com/data/histoday?fsym="+navCoins[key]+"&tsym="+coin+"&limit="+days+"&aggregate=1&e=CCCAGG";
	  this.setState({isLoading: true, activeKey: key});
	  axios.get(url)
	    .then(res => {
	    		this.setChart(coin, res, days);
	     });
		}

	getCoinData(key) {
		const {navCoins} = this.state;
		let url = "https://min-api.cryptocompare.com/data/pricemulti?fsyms="+
							navCoins.join()+"&tsyms="+navCoins[key];
		this.setState({isLoading: true, coinData: false})
		axios.get(url).then(res => {
			 this.setState({ coinData: res.data, isLoading: false });
		});
	}

	/* Reset dashboard to current coin values */
	handleSelect(key) {
		this.componentCleanup();
    this.getCoinData(key);
    this.getChartData(key < 3 ? 'BTC' : 'USD', key);
	}

  componentDidMount() {
    const {activeKey} = this.state;
    this.getCoinData(0);
    this.getChartData(activeKey < 3 ? 'BTC' : 'USD', activeKey);
  }

  componentWillUnmount(){
  	let { chart, } = this.state;
    if (chart)
     chart.dispose();
  }

  render() {
  	const {activeKey, isLoading, coinData, navCoins} = this.state;
  	const coinCols = [];
  	/* Create 4 item columns  */
  	for (let i = 0; i < this.coins.length/4; i++) {
			coinCols[i] = [];
			for (let j = i; j < i+10; j+= 3)
				coinCols[i][j] = this.coins[j];
  	} 
    return (
    	<div>
    		{isLoading && <TopBarProgress />}
    		<Bar  {...{activeKey, coins:this.coins, onSelect: this.handleSelect }} />
        <div className="container" >
        	<div className="row" >
					<div className="col-md-12" >
						<Tabs defaultActiveKey={1} id="uncontrolled-tab-example" >
							<Tab eventKey={1} title="Dashboard">
								{ <DashBoardWithCoinData  {...{coinData, coinCols, navCoins, activeKey}} />}
							</Tab>
							<Tab eventKey={2} title="Statistics">								
								<div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
							</Tab>
						</Tabs>
					</div>
        	</div>
        </div>      
			</div>
    );
  }
}

const withCoinData = Component => ({coinData, coinCols, navCoins, activeKey}) =>
	coinData ? 	 <Component {...{coinData, coinCols, navCoins, activeKey}} /> : <Loading />

const DashBoardWithCoinData = withCoinData(DashBoard);