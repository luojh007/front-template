import React, { Component } from 'react'
import { Button } from 'antd'
import ImportModal from '../../../components/ImportModal'
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }
  render() {
    const { visible } = this.state;
    const modalProps = {
      title: '住培生账号信息导入',
      onCancel: () => this.setState({ visible: false }),
    }
    return (
      <div>
        <Button onClick={() => this.setState({ visible: true })}>导入文件</Button>
        {visible ? <ImportModal {...modalProps} /> : ''}
      </div>
    )
  }
}
