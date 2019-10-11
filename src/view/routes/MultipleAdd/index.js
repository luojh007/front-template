import React, { Component } from 'react'
import { Button } from 'antd'
import MultipleAddModal from '../../../components/MultipleAddModal'
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }
  modalOnOK = (data) => {
    console.log(data)
  }
  render() {
    const { visible } = this.state;
    const modalProps = {
      title: '动态多个新增',
      onCancel: () => this.setState({ visible: false }),
      onOK: this.modalOnOK
    }
    return (
      <div>
        <Button onClick={() => this.setState({ visible: true })}>动态多个新增</Button>
        {visible ? <MultipleAddModal {...modalProps} /> : ''}
      </div>
    )
  }
}
