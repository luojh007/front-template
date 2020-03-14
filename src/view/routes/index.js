import React, { Component } from 'react'
import { Button } from 'antd'
import style from './style.css'
export default class index extends Component {
  render() {
    return (
      <div>
        前端自动化构建
        <Button onClick={() => this.props.history.push('/app1')}>a项目切换</Button>
        <Button onClick={() => this.props.history.push('/app2')}>b项目切换</Button>
        <div className={style.img}></div>
      </div>
    )
  }
}
