import React, { Component } from 'react'
import RootRouter from "./router";
import { BrowserRouter as RouterContainer } from "react-router-dom";
export default class App extends Component {
  render() {
    const supportsHistory = 'pushState' in window.history;
    return (
      <RouterContainer forceRefresh={!supportsHistory} >
        <RootRouter /> 
      </RouterContainer>
    )
  } 
}

