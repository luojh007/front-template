import React, { Component } from "react";
import {
  Form,
  Select,
  message,
  Button,
} from "antd";
// import { getPeopleItem } from "../../actions/main";
import One from '../../../components/Modal/One'
const FormItem = Form.Item;
const Option = Select.Option;
class AdminModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {}
    };
  }
  componentDidMount() {
  }
  onConfirm = data => {
    message.success(data)
  };
  render() {
    const modalProps = {
      title: '基本弹窗1',
      visible: true,
      onCancel: () => { this.setState({ visible: false }) }
    }
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={() => this.setState({ visible: true })}>弹窗</Button>
        {visible ?
          <One {...modalProps} /> : ''}
      </div>

    );
  }
}
export default Form.create()(AdminModal);