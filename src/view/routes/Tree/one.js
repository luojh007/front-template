import React, { Component } from 'react'
import TreeOne from '../../../components/Tree/TreeOne'
export default class One extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const treeProps = {

    }
    return (
      <div>
        <TreeOne {...treeProps} />
      </div>
    )
  }
}
