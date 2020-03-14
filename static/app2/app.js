import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react'
class App extends Component {
  render() {
    return (
      <div>
        我是项目2
      </div>
    )
  }
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: document.getElementById('app2'),
})

export const bootstrap = [
  reactLifecycles.bootstrap,
]

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];