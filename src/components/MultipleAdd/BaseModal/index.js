import React, { Component } from 'react'
import { Modal, Input, Icon, Button, Form } from 'antd'
import styles from './style.less'
const FormItem = Form.Item
var uuid = 1;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        name: '',
        uuid,
      }]
    }
  }
  onOkClick = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value);
        let arr = [];
        for (let i in value) {
          let obj = {};
          obj[i.split('-')[0]] = value[i];
          arr.push(obj);
        }
        this.props.onOK(arr);
      }
    })
  }
  addClick = (index) => {
    let { data } = this.state;
    uuid++;
    data.splice(index + 1, 0, {
      uuid,
      name: '',
    })
    this.setState({ data });
  }
  deleteClick = (index) => {
    let { data } = this.state;
    data.splice(index, 1);
    this.setState({ data });
  }
  render() {
    const { title, onCancel, maxLength = 10 } = this.props;
    const { data } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Modal
        visible={true}
        title={title}
        onCancel={onCancel}
        footer={<Button onClick={this.onOkClick}>保存</Button>}
      >
        <div className={styles.main}>
          <span className={styles.left}>科室名称</span>
          <div className={styles.right}>
            {data.map((item, index) => {
              return <FormItem key={item.uuid} label=''>
                {getFieldDecorator(`name-${item.uuid}`, {
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: '请输入科室名字'
                  }]
                })(
                  <div className={styles.item}>
                    <Input style={{ width: 320 }} placeholder='不超过30个字符' />
                    <div style={{ fontSize: 20 }}>
                      {((index + 1) != data.length || data.length > 1) ? <Icon type="minus-circle" onClick={() => this.deleteClick(index)} /> : ''}
                      {data.length < maxLength ? <Icon type="plus-circle" onClick={() => this.addClick(index)} style={{ marginLeft: 8 }} /> : ''}
                    </div>
                  </div>
                )}
              </FormItem>
            })}
          </div>
        </div>
      </Modal>
    )
  }
}
export default Form.create()(Index)
