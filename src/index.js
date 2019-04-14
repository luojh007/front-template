import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './view/app'
import store from './store/index'
class Main extends React.Component{
  constructor(){
    super();
  }
  render(){
    return <Provider store={store}><App/></Provider>
  }
}

ReactDOM.render(<Main/>,document.getElementById('app'));