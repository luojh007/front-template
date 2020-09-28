import React, { Component } from 'react';

export default class subIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromProps(nextPorps, preState) {
    console.log('getDerivedStateFromProps', nextPorps, preState);
    return null;
  }
  shouldComponentUpdate(nextPorps, nextState) {
    console.log('shouldComponentUpdate', nextPorps, nextState);
    return true;
  }
  render() {
    return <div>life-cycle</div>;
  }
  getSnapshotBeforeUpdate(preProps, preState) {
    console.log('getSnapshotBeforeUpdate', preProps, preState);
    return 'snapshot';
  }
  componentDidUpdate(preProps, preState, snapshot) {
    console.log('componentDidUpdate', preProps, preState, snapshot);
  }
  componentDidMount() {}
}
