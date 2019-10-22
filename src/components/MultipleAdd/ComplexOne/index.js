import React, { Component } from 'react'
import { Select, Input, Icon, Radio, Form, InputNumber, Button } from 'antd'
import styles from './style.less'
const { Option } = Select
var uuid = 1;
const addUuid = (data = {}) => {
  return data.stepList && data.stepList.map(item => {
    item.uuid = uuid;
    uuid++;
    return item;
  })
}
class ComplexOne extends Component {
  constructor(props) {
    super(props);
    var data = { ...props.data };
    if (data.type == 2) {
      addUuid(data);
    }
    this.state = {
      data
    }
  }
  saveClick = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        var type = values.type;
        let params = {
          type: values.type,
        }
        //简单
        if (type == 1) {
          params.addOrSub = values.addOrSub;
          params.weight = values.weight;
        }
        //复杂 
        else {
          let obj = {};
          for (let i in values) {
            if (i == 'type') { continue; }
            if (obj[i.split('-')[1]]) {
              obj[i.split('-')[1]][i.split('-')[0]] = values[i];
            } else {
              obj[i.split('-')[1]] = {};
              obj[i.split('-')[1]][i.split('-')[0]] = values[i];
            }
          }
          let stepList = []
          for (let i in obj) {
            stepList.push(obj[i])
          }
          params.stepList = stepList;
        }
        console.log(params);
      }
    })
  }
  // static getDerivedStateFromProps(props, state) {
  //   console.log(111)
  //   if (props.data != state.data) {
  //     var data = { ...props.data };
  //     if (data.type == 2) {
  //       addUuid(data);
  //     }
  //     return {
  //       ...state,
  //       data
  //     }
  //   }
  //   return null
  // }
  addClick = (index) => {
    let { data } = this.state;
    uuid++;
    data.stepList.splice(index + 1, 0, {
      uuid,
    })
    this.setState({ data });
  }
  deleteClick = (index) => {
    let { data } = this.state;
    data.stepList.splice(index, 1);
    this.setState({ data });
  }
  render() {
    const { data = {}, maxLength } = this.props
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (<Form>
      <Form.Item>
        {getFieldDecorator('type', {
          rules: [{ require: true, message: '类型必选' }],
          initialValue: data.type && data.type.toString()
        })(
          <Radio.Group>
            <Radio.Button value="1">简单方式</Radio.Button>
            <Radio.Button value="2">复杂方式</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
      {
        getFieldValue('type') == '1' ? <div className={styles.simpleItem}>
          每{getFieldValue(`addOrSub`) == 1 ? '增加' : '扣除'}一个<span className={styles.remarkSpan}>例次</span>，权重
          <Form.Item>
            {getFieldDecorator('addOrSub', {
              rules: [{ require: true, message: '选择增加或者扣除' }],
              initialValue: data.addOrSub && data.addOrSub.toString()
            })(
              <Select style={{ width: 75, margin: '0 10px' }} placeholder='请选'>
                <Option key='1'>增加</Option>
                <Option key='2'>扣除</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('weight', {
              initialValue: data.weight
            })(
              <InputNumber style={{ width: 75 }} min={0} step={0.1} precision={3} placeholder='权重' />
            )}
          </Form.Item>
        </div>
          : data.stepList && data.stepList.map((item, index) => {
            return <div key={item.uuid} className={styles.complexItem}>
              <span className={styles.remarkSpan}>例次</span>数 {(getFieldValue(`addOrSub-${item.uuid}`) || item.addOrSub) == '1' ? '>=' : '<='}
              <Form.Item >
                {getFieldDecorator(`limitValue-${item.uuid}`, {
                  initialValue: item.limitValue
                })(
                  <InputNumber style={{ width: 60, margin: '0 10px' }} min={0} step={1} precision={0} />
                )}
              </Form.Item>
              时，
              权重
              <Form.Item>
                {getFieldDecorator(`addOrSub-${item.uuid}`, {
                  rules: [{ require: true, message: '选择增加或者扣除' }],
                  initialValue: item.addOrSub && item.addOrSub.toString()
                })(
                  <Select style={{ width: 75, margin: '0 10px' }} placeholder='请选'>
                    <Option key='1'>增加</Option>
                    <Option key='2'>扣除</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator(`weight-${item.uuid}`, {
                  initialValue: item.weight
                })(
                  <InputNumber style={{ width: 75 }} min={0} step={0.1} precision={3} placeholder='权重' />
                )}
              </Form.Item>&nbsp;，
              此后每{getFieldValue(`addOrSub-${item.uuid}`) == 1 ? '增加' : '扣除'}
              <Form.Item >
                {getFieldDecorator(`stepValue-${item.uuid}`, {
                  initialValue: item.stepValue
                })(
                  <InputNumber style={{ width: 60, margin: '0 10px' }} min={0} step={1} precision={0} />
                )}
              </Form.Item>
              个<span className={styles.remarkSpan}>例次</span>，权重
              <Form.Item>
                {getFieldDecorator(`addOrSub-${item.uuid}`, {
                  rules: [{ require: true, message: '选择增加或者扣除' }],
                  initialValue: item.addOrSub && item.addOrSub.toString()
                })(
                  <Select style={{ width: 75, margin: '0 10px' }} placeholder='请选'>
                    <Option key='1'>增加</Option>
                    <Option key='2'>扣除</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator(`stepWeight-${item.uuid}`, {
                  initialValue: item.stepWeight
                })(
                  <InputNumber style={{ width: 75 }} min={0} step={0.1} precision={3} placeholder='权重' />
                )}
              </Form.Item>
              {(data.stepList.length == index + 1) ?
                <div className={styles.addOperate}>
                  {((index + 1) != data.stepList.length || data.stepList.length > 1) ? <Icon type="minus-circle" onClick={() => this.deleteClick(index)} /> : ''}
                  {data.stepList.length < maxLength ? <Icon type="plus-circle" onClick={() => this.addClick(index)} style={{ marginLeft: 8 }} /> : ''}
                </div> : ''}
            </div>
          })
      }
      <Form.Item>
        <Button onClick={this.saveClick}>保存</Button>
      </Form.Item>
    </Form>
    )
  }
}
export default Form.create()(ComplexOne)
