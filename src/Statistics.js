import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios'

am4core.useTheme(am4themes_animated);

class Statistics extends Component {

  constructor(props) {
    super(props);
    this.coins = [
        "USD", "EUR", "GBP", "BTC", "LTC", "BCH", "ETH", "ETC", "ZEC", 
        "DASH","XMR", "DCR",
      ];
  }
  
  setChart(chart, coin) {
    chart.paddingRight = 20;
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    valueAxis2.renderer.grid.template.strokeDasharray = "2,3";
    valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
    valueAxis2.renderer.minWidth = 60;

    let series = chart.series.push(new am4charts.LineSeries());
    series.name = "BTC";
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "BTC";
    series.fill = am4core.color("#e59165");
    series.stroke = am4core.color("#e59165");
    series.tooltipText = "{valueY.value}";

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "ETH";
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "ETH";
    series2.tooltipText = "{valueY.value}";

    chart.cursor = new am4charts.XYCursor();
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

    valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;
  }


  componentDidMount() {
    let coins = ["BTC", "ETH"];
    let days = 365;
    let currentCoin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
    let urls = []
    for (var i = 0; i < coins.length; i++) {
      if (this.currentCoin === coins[i])
        continue;
      urls[i] = "https://min-api.cryptocompare.com/data/histoday?fsym="+coins[i]+"&tsym="+currentCoin+"&limit="+days+"&aggregate=1&e=CCCAGG";
    }; 
    axios.all([
        axios.get(urls[0]),
        axios.get(urls[1]),
      ])
      .then(axios.spread( (btcRes, ethRes) => {
          let chart = am4core.create("chartdiv", am4charts.XYChart);
          this.setChart(chart);
          
          chart.data = []
          for (var i = 0; i < days+1; i++)
            chart.data[i] = {
              date: new Date(btcRes.data.Data[i].time*1000),
              BTC: btcRes.data.Data[i].close,
              ETH: ethRes.data.Data[i].close,
            };
          this.chart = chart;
        })
    )
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

	render() {
		return(
		  <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
		);
	}
}


export default Statistics