import React, { Component } from 'react'
import RouterConfig from './router'
import { ConnectedRouter } from 'react-router-redux'
import { BrowserRouter } from 'react-router-dom'
export default class App extends Component {
  render() {
    const supportsHistory = 'pushState' in window.history;
    return (
      
      <BrowserRouter forceRefresh={!supportsHistory} >
        <RouterConfig /> 
      </BrowserRouter>
    )
  } 
}

