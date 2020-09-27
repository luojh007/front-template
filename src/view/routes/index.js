import React, { Component } from 'react'
import {MySearchBar} from 'biosan-front-ui'
const dataScore = [
  {
    type: 'input',
    label: '姓名',
    key: 'name'
  },
  {
    type: 'select',
    label: '性别',
    key: 'sex',
    options: [
      { label: '男', value: '1' },
      { label: '女', value: '2' }
    ]
  },
  {
    type: 'rangePicker',
    label: '工作时间',
    key: 'rangePicker_jobStart_jobEnd',
    keys: ['jobStart', 'jobEnd'],
  },
  {
    type: 'datePicker',
    label: '出生日期',
    key: 'datePicker_birthday',
    keys: ['birthday']
  },
  {
    type: 'cascader',
    label: '出生地址',
    key: 'address',
    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ]
  },
]
const value = {
  name: undefined,
  sex: undefined,
  jobStart: undefined,
  jobEnd: undefined,
  birthday: undefined,
  address: undefined,
}
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expand: false,
       visible: false, confirmLoading: false 
    }
  }
 
  onSearch = (value) => {
    console.log(value)
  }
  onExpand = () => {
    this.setState({ expand: !this.state.expand })
  }
  render() {

    return (

      <div>
        {/* <Button>aaaa</Button> */}
        前端自动化构建    
        <MySearchBar
          wrappedComponentRef={searchFrom => this.searchFrom = searchFrom }
          searchInfo={value}
          itemList={dataScore}
          expand={this.state.expand}
          onSearch={this.onSearch}
          onExpand={this.onExpand}
        />
      </div>
    )
  }
}
