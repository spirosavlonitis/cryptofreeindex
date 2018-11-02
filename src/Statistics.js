import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios'

am4core.useTheme(am4themes_animated);

class Statistics extends Component {
  
  setChart(chart, coins) {
    chart.paddingRight = 20;
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 60;

    let scrollbarX = new am4charts.XYChartScrollbar();
    /* add coin to chart and scrobarX series  */
    for (let i in coins) {
      let series = chart.series.push(new am4charts.LineSeries());
      series.name = coins[i].id;
      series.dataFields.dateX = "date";
      series.dataFields.valueY = coins[i].id;
      series.fill = am4core.color(coins[i].color);
      series.stroke = am4core.color(coins[i].color);
      series.tooltipText = "{valueY.value}";
  
      scrollbarX.series.push(series);
    }

    chart.cursor = new am4charts.XYCursor();
    chart.scrollbarX = scrollbarX;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;
  }


  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
    let coins = [
      {id: "BTC", color: "#f2a900"}, {id: "LTC", color: "#d3d3d3"}, {id: "BCH", color: "#4cca47"},
      {id: "ETH", color: "#3385ff"}, {id: "ETC", color: "#669073"}, {id: "ZEC", color: "#f4b728"},
      {id: "DASH", color: "#2075bc"}, {id: "XMR", color: "#ff6600"}, {id: "DCR", color: "#62D0C9"},
    ];
    let days = 365;
    let currentCoin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
    let urls = []
    for (var i = 0; i < coins.length; i++) {
      if (this.currentCoin === coins[i])
        continue;
      urls[i] = "https://min-api.cryptocompare.com/data/histoday?fsym="+coins[i].id+"&tsym="+currentCoin+"&limit="+days+"&aggregate=1&e=CCCAGG";
    }; 
    axios.all([
        axios.get(urls[0]), axios.get(urls[1]), axios.get(urls[2]),
        axios.get(urls[3]), axios.get(urls[4]), axios.get(urls[5]),
        axios.get(urls[6]), axios.get(urls[7]), axios.get(urls[8]),
      ])
      .then(axios.spread( (btcRes, ltcRes, bchRes, ethRes, etcRes, zecRes, dashRes, xmrRes, dcrRes) => {
          let chart = am4core.create("chartdiv", am4charts.XYChart);
          this.setChart(chart, coins);

          chart.data = []
          for (var i = 0; i < days+1; i++)
            chart.data[i] = {
              date: new Date(btcRes.data.Data[i].time*1000),
              BTC: btcRes.data.Data[i].close,
              LTC: ltcRes.data.Data[i].close,
              BCH: bchRes.data.Data[i].close,
              ETH: ethRes.data.Data[i].close,
              ETC: etcRes.data.Data[i].close,
              ZEC: zecRes.data.Data[i].close,
              DASH: dashRes.data.Data[i].close,
              XMR: xmrRes.data.Data[i].close,
              DCR: dcrRes.data.Data[i].close,
            };
          this.chart = chart;
        })
    )
  }

  componentCleanup() {
    if (this.chart)
      this.chart.dispose();
  }

  componentWillUnmount() {
     if (this.chart)
      this.chart.dispose();

  }

	render() {
		return(
		  <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
		);
	}
}


export default Statistics