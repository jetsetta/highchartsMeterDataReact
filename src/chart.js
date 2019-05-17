import React from 'react'
import { Button } from 'reactstrap';

const ReactHighstock = require('react-highcharts/ReactHighstock');
const jsonTimeSeriesData = require('./Disagg.json')

export class Chart extends React.Component {
  constructor(props){
    super(props)

    function formatData() {
      let formattedDataObject = {}
      jsonTimeSeriesData.forEach((userDataOnDate) => {
        if(!formattedDataObject[userDataOnDate.Meter_ID]) {
          formattedDataObject[userDataOnDate.Meter_ID] = {
            BaseLoad: [],
            TSL: [],
            WSL: []
          }
        }
        else{

          const datesArray = []
          let i = 1
          while(i < 24){
            datesArray.push([new Date(userDataOnDate.Date).setHours(i), userDataOnDate[i]])
            i += 1
          }

          formattedDataObject[userDataOnDate.Meter_ID][userDataOnDate.Type].push(datesArray)
        }
      })

      return formattedDataObject
    }

    let meterDatesData = {
      BaseLoad: [],
      TSL: [],
      WSL: []
    }
    const formatted = formatData()
    for(let meterID in formatted){
      let meter = formatted[meterID]
      for(let meterType in meter){
        let meterData = meter[meterType]
        meterData.forEach((arrayOfMeterData)=>{
          arrayOfMeterData.forEach((dateAndValueTuple)=>{
            if(meterID === this.props.id){
              meterDatesData[meterType].push(dateAndValueTuple)
            }
          })
        })
      }
    }

    this.config = {
      rangeSelector: {
          buttons: [{
              type: 'day',
              count: 1,
              text: '1D'
          }, {
              type: 'week',
              count: 1,
              text: '1W'
          },{
              type: 'month',
              count: 1,
              text: '1M'
          }, {
              type: 'all',
              count: 1,
              text: 'All'
          }],
          selected: 1,
          inputEnabled: false
      },

      yAxis: {
        labels: {
            formatter: function () {
                return this.value;
            }
        },
        plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
        }]
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
        valueDecimals: 2,
        split: true
      },
      series: [{
        name: 'Base',
        data: meterDatesData.BaseLoad,
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: 'Time Sensitive',
        data: meterDatesData.TSL,
        tooltip: {
          valueDecimals: 2
        }
      },
      {
        name: 'Weather Sensitive',
        data: meterDatesData.WSL,
        tooltip: {
          valueDecimals: 2
        }
      }]
    };

  }

  componentDidMount() {
    let chart = this.refs.chart.getChart();
  }

  render() {
    return (<div><Button onClick={()=>{this.props.backButtonClicked()}}>back</Button><ReactHighstock config={this.config} ref="chart"></ReactHighstock></div>)
  }
}
