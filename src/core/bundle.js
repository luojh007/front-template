import React, { Component } from 'react';

export default class Bundle extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null
    }
  }
  componentWillMount() {
    this.load(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps)
    }
  }
  load(props) {
    this.setState && this.setState({
      mod: null
    })
    
    // 由于这里的 props.load ，就是由 import .. from 'bundle-loader?' 形式生成并传入的；
    // 所以，它本来就是一个函数: waitForChunk
    props.load((mod) => {
      this.setState && this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      })
    })
  }
  render() {
    if (!this.state.mod)
      return false
    return this.props.children(this.state.mod) // 子组件为函数形式
  }
}
