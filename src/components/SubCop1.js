import React, { Component } from 'react'
export default class SubCop extends Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props.name)
    return <div>subCom1</div>
  }
}
