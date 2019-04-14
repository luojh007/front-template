import React, { Component } from 'react'
import { Button } from 'antd'
import styles from './style.css'
export default class Test1 extends Component {
  constructor(props) {
    super(props);
    console.log(1);
    console.log(this.asyFuna);
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  asyFuna = async ()=>{
    console.log('asyFunA')
    const a = await this.funB();
    a();
    console.log('funa End')
  }
  funB = ()=>{
    return new Promise()
  }
  render() {
    console.log('render')
    return (
      <div className={styles.content}>
        <Button type='primary'>sss</Button>

        <div className={styles.box}></div>
      </div>
    )
  }
}
