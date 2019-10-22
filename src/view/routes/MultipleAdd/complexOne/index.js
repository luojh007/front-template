import React, { Component } from 'react'
import ComplexOne from '../../../../components/MultipleAdd/ComplexOne'
export default class Index extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const complexOneProps = {
      data: {
        "type": '2',
        "stepList": [{
          "limitValue": 20,
          "addOrSub": 1,
          "weight": 2,
          "stepValue": 3,
          "stepWeight": 2
        },
        {
          "limitValue": 20,
          "addOrSub": 1,
          "weight": 2,
          "stepValue": 3,
          "stepWeight": 2
        }
        ]
      },
      maxLength: 6
    }
    return (
      <div>
        <ComplexOne {...complexOneProps} />
      </div>
    )
  }
}
