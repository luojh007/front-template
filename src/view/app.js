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

