import React, { Component } from 'react'
import RootRouter from "./router";
import { BrowserRouter as RouterContainer } from "react-router-dom";
window.SystemJS = window.System;
const { bootstrap } = require('../spa/bootstrap')
export default class App extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    //这里可以逻辑判断，是否引入引导程序
    bootstrap()
  }


  render() {
    const supportsHistory = 'pushState' in window.history;
    return (
      <RouterContainer forceRefresh={!supportsHistory} >
        <RootRouter /> 
      </RouterContainer>
    )
  } 
}

