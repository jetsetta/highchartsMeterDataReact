import React from 'react'
import {Chart} from './chart';
import {List} from './list';

export class ListOrChart extends React.Component {
  constructor(){
    super()
    this.state = {
      chartActive: false,
      listActive: true,
      selectedId: ''
    }
  }

  idSelected(id) {
    this.setState({chartActive: true, listActive: false, selectedId: id})
  }

  backButtonClicked(){
    this.setState({chartActive: false, listActive: true, selectedId: ''})
  }

  render(){
    return (
      <div>
        {this.state.chartActive ? <Chart id={this.state.selectedId}backButtonClicked={this.backButtonClicked.bind(this)}/> : null}
        {this.state.listActive ? <List idSelected={this.idSelected.bind(this)}/> : null}
      </div>
    )
  }
}
