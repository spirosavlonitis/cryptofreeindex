import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from 'axios'

am4core.useTheme(am4themes_animated);

class Statistics extends Component {
  
  setChart(chart) {
    chart.paddingRight = 20;
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
  }


  componentDidMount() {
    let days = 365;
    let currentCoin = document.getElementsByClassName('active')[0].childNodes[0].innerText;
    let url = "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym="+currentCoin+"&limit="+days+"&aggregate=1&e=CCCAGG";

    axios.get(url).then(res=> {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      this.setChart(chart);
      
      chart.data = []
      for (var i = 0; i < days+1; i++)
        chart.data[i] = {
          date: new Date(res.data.Data[i].time*1000),
          name: "name"+i,
          value: res.data.Data[i].close
        };
      this.chart = chart;
    })

    
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