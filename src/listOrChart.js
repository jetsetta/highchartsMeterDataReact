import React from 'react'
import {Chart} from './chart';
import {List} from './list';

export class ListOrChart extends React.Component {
  constructor(){
    super()
    this.state = {
      chartActive: true,
      listActive: false
    }
  }
  render(){
    return (
      <div>
        {this.state.chartActive ? <Chart/> : null}
        {this.state.listActive ? <List/> : null}
      </div>
    )
  }
}
