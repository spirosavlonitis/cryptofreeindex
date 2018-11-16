import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios';
import TopBarProgress from "react-topbar-progress-indicator";

am4core.useTheme(am4themes_animated);

TopBarProgress.config({
  barColors: {
    "0": "#f00",
    "1.0": "#ff5050",
  },
  shadowBlur: 5,
});


class Statistics extends Component {

  constructor(props) {
    super(props);
    this.coins = {
      BTC: {color: "#f2a900"}, LTC: {color: "#d3d3d3"}, BCH: {color: "#4cca47"},
      ETH: {color: "#3385ff"}, ETC: {color: "#669073"}, ZEC: {color: "#f4b728"},
      DASH:{ color: "#2075bc"}, XMR: {color: "#ff6600"}, DCR: {color: "#62D0C9"},
      USD: {color: "#339933"}
    };
    
    this.navCoins = [ "USD", "EUR", "GBP",].concat((Object.keys(this.coins)));

    this.currentCoin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
    this.state = {
      chart: undefined,
      isLoading: false,
    };
    window.addEventListener('beforeunload', this.componentCleanup.bind(this));
    window.addEventListener('mousedown', this.coinChanged.bind(this));
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
    series.fill = am4core.color(this.coins[coin].color);
    series.stroke = am4core.color(this.coins[coin].color);
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

  setChart(coin, days=365) {
    let url;
    if(this.navCoins.slice(0,3).includes(this.currentCoin))
      url = "https://min-api.cryptocompare.com/data/histoday?fsym="+coin+"&tsym="+this.currentCoin+"&limit="+days+"&aggregate=1&e=CCCAGG";
    else
      url = "https://min-api.cryptocompare.com/data/histoday?fsym="+this.currentCoin+"&tsym="+coin+"&limit="+days+"&aggregate=1&e=CCCAGG";
    this.setState({isLoading: true});
    axios.get(url)
      .then(res => {
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
          }
          this.setState({ chart, isLoading: null });
        })
  }

  componentDidMount() {
    const {navCoins, currentCoin} = this;
    this.setChart(navCoins.slice(0,3).includes(currentCoin)
      ? 'BTC'
      : 'USD'
    );
  }

  componentCleanup() {
    let { chart, } = this.state;
    if (chart)
     chart.dispose();
    else
      console.log("this.state.chart is undefined !!");
  }

  coinChanged(event) {
    const validID = (id, length) =>  id >= 0 && id <= length;
    if (validID(event.target.id, this.navCoins.length)) {
      this.componentCleanup();
      this.currentCoin = this.navCoins[event.target.id];
      this.setChart((event.target.id < 3) ? 'BTC' : 'USD' );
    }
  }
  componentWillUnmount() {
    let { chart, } = this.state;
    if (chart)
     chart.dispose();
    else
      console.log("this.state.chart is undefined !!");
  }

	render() {
    const {isLoading,} = this.state;
		return(
      <div>
        { isLoading && <TopBarProgress /> }
      </div>
		);
	}
}


export default Statistics