import React, { Component ,PureComponent} from 'react'

export default class SubCop4 extends PureComponent {
  render() {
    return (
      <div>
        {this.props.list.map((it, ind) => {
          return <div key={ind}>{it}</div>
          
        })}
      </div>
    )
  }
}
