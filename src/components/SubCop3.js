import React, { Component,PureComponent } from 'react'

export default class SubPureCop extends PureComponent {
  render() {
    console.log(this.props.name)
    return (
      <div>
        SubPureCop
      </div>
    )
  }
}
