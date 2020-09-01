import React, { Component } from 'react'
import SubCop from './SubCop1'
import SubCop2 from './SubCop2'
import SubPureCop from './SubCop3'
import SubListCop from './SubCop4'
import { Button } from 'antd'
export default class FatherC extends Component {
  constructor(props){
    super(props)
    this.state = {
      subOne: 111,
      subTwo: 222,
      subThree: 333,
      list:[]
    }
  }
  addItem = ()=>{
    const arr = this.state.list;
    arr.push( new Date().valueOf())
    this.setState({list: arr})
  }
  render() {
    console.log('father')
    return (
      <div>
        <div>
          <Button onClick={()=>this.setState({subOne: 111})}>change subOne</Button>
          <Button onClick={()=>this.setState({subTwo: 222})}>change subTwo</Button>
          <Button onClick={()=>this.setState({subThree: this.state.subThree+1})}>change subThree</Button>
          <Button onClick={this.addItem}>addList</Button>
        </div>
        <SubCop name={this.state.subOne}/>
        <SubCop2 name={this.state.subTwo}/>
        <SubPureCop name={this.state.subThree}/>
        <SubListCop list={this.state.list}/>
      </div>
    )
  }
}
