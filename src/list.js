import React from 'react'
import {ListGroup, ListGroupItem} from 'reactstrap';

const jsonTimeSeriesData = require('./Disagg.json')

let arrayOfIds = []

jsonTimeSeriesData.forEach((userDataOnDate) => {
  if(!arrayOfIds.includes(userDataOnDate.Meter_ID)) {
    arrayOfIds.push(userDataOnDate.Meter_ID)
  }
})

export class List extends React.Component {
  constructor(){
    super()
  }
  onIdSelect(id) {
    this.props.idSelected(id)
  }
  render(){
    return <div> <h2>User Meter ID</h2>
      <ListGroup>
        {arrayOfIds.map((id)=>{
          return (<ListGroupItem onClick={()=>{ this.onIdSelect(id)}} key={id} tag="button" action>
            {id}
          </ListGroupItem>)
        })}
      </ListGroup>
    </div>
  }
}
