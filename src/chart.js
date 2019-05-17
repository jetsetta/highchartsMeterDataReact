import React from 'react'
import { Button } from 'reactstrap';

const ReactHighstock = require('react-highcharts/ReactHighstock');
const jsonTimeSeriesData = require('./Disagg.json')

export class Chart extends React.Component {
  constructor(props){
    super(props)

    // this function returns parsed and formatted data from the raw source
    function formatData() {

      // this object will be populated with a structure that is more easy to use
      // from a state management perspective
      let formattedDataObject = {}

      // maps over each time series day object in the array
      jsonTimeSeriesData.forEach((userDataOnDate) => {

        // if the meter ID exists on the object, dont add it, otherwise do
        if(!formattedDataObject[userDataOnDate.Meter_ID]) {
          formattedDataObject[userDataOnDate.Meter_ID] = {
            BaseLoad: [],
            TSL: [],
            WSL: []
          }
        }
        else{

          // converts the hours into epoch time and puts that into a tuple along with the load value for that epoch time
          const hoursOfDayData = []
          let i = 1
          while(i < 24){
            hoursOfDayData.push([new Date(userDataOnDate.Date).setHours(i), userDataOnDate[i]])
            i += 1
          }

          // puts the array of epoch and value tuples for this day onto the type object for this meter type
          formattedDataObject[userDataOnDate.Meter_ID][userDataOnDate.Type].push(hoursOfDayData)
        }
      })

      // returns the structured time series data object
      return formattedDataObject
    }

    // this will be popluated by storing all timeseries data into an array based on
    // its meter type
    let meterDatesData = {
      BaseLoad: [],
      TSL: [],
      WSL: []
    }

    // this calls the formatData function and the result is stored in the
    // constant.
    const formatted = formatData()

    // loops over every meter, and pushes the meter data into a master
    // array that will be fed into highcharts
    for(let meterID in formatted){
      let meter = formatted[meterID]
      for(let meterType in meter){
        let meterData = meter[meterType]
        meterData.forEach((arrayOfMeterData)=>{
          arrayOfMeterData.forEach((dateAndValueTuple)=>{

            // makes sure that only data that belongs to this meter is
            // fed into high charts
            if(meterID === this.props.id){
              meterDatesData[meterType].push(dateAndValueTuple)
            }
          })
        })
      }
    }

    // configuration for highcharts
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
    return (
      <div>
        <Button onClick={()=>{this.props.backButtonClicked()}}>back</Button>
        <ReactHighstock config={this.config} ref="chart">
        </ReactHighstock>
      </div>)
  }
}
