import React, { Component } from 'react';
import SubIndex from './subIndex';
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(nextProps) {
    console.log(nextProps);
    return null;
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({ name: 'ljh' })}>点击修改</button>
        <SubIndex name={this.state.name} />
      </div>
    );
  }
}
