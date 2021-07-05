import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
// import App from './view/app'
// import store from './store/index'
class Main extends React.Component {
  constructor() {
    super();
  }
  render () {
    return <div>Hellow wor12!</div>
  }
}
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();

}

ReactDOM.render(<Main />, document.getElementById('app'));