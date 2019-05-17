import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

const jsonTimeSeriesData = require('./Disagg.json')

let arrayOfIds = []

jsonTimeSeriesData.forEach((userDataOnDate) => {
  if(!arrayOfIds.includes(userDataOnDate.Meter_ID)) {
    arrayOfIds.push(userDataOnDate.Meter_ID)
  }
})

console.log(arrayOfIds)

export class List extends React.Component {
  constructor(){
    super()
  }
  onIdSelect(id) {
    console.log(id)
    this.props.idSelected(id)
  }
  render(){
    return <ListGroup>
      {arrayOfIds.map((id)=>{
        return (<ListGroupItem onClick={()=>{ this.onIdSelect(id)}} key={id} tag="button" action>
          {id}
        </ListGroupItem>)
      })}
     </ListGroup>
  }
}
