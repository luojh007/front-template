import React, { Component } from 'react'
import { Button, Upload, Form, Icon, message } from 'antd'
import { customRequest } from '../../../core/_utils/upload'
const apiConfig = require('../../../store/api')
const FormItem = Form.Item
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    }
  }
  componentDidMount() {
    var resFileData = [{
      name: '接口返回的文件名字',
      status: 'done',
      uid: (new Date()).valueOf(),
      url: '//www.baidu.com'
    }]
    this.setState({ fileList: resFileData });
  }
  fileBeforeUpload = (file, key) => {
    let isType
    if (file && file.type) {
      isType = /application\/pdf/.test(file.type)
        || /word*/.test(file.type)
        || /officedocument.presentationml.presentation*/.test(file.type)
    } else if (file && file.name) {
      const fileName = file.name.split('.')[file.name.split('.').length - 1];
      isType = (/(docx?|pptx?|pdf|xlsx?)/i.test(fileName));
    }
    if (!isType) {
      message.error('文档格式只能为docx、doc、pdf');
      return false
    }
    const checkname = this.state[key].some((item) => item.name == file.name)
    if (checkname) {
      message.error('不能上传同名文件!')
      return false
    }
    const isSize = file.size / 1024 / 1024 < 50
    if (!isSize) {
      message.error('文档大小必须控制在50MB以内!');
      return isSize
    }
    return isType && isSize;
  }

  fileOnChange = (info, key) => {
    const fileList = info.fileList.map((file) => {
      if (file.response) {
        file.url = apiConfig.resourcesUrl + JSON.parse(file.response.response).hash
      }
      return file
    }).filter((file) => file.status == 'done' || file.status == 'uploading')
    this.setState({ [key]: fileList })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { sm: { span: 4 } }, wrapperCol: { sm: { span: 14 } }
    }
    return (
      <div>
        <Form>
          <FormItem
            label="上传至七牛"
            required
            {...formItemLayout}
          >
            <Upload
              customRequest={customRequest}
              fileList={this.state.fileList}
              onChange={(file) => this.fileOnChange(file, 'fileList')}
              beforeUpload={(file) => this.fileBeforeUpload(file, 'fileList')}
            // disabled={!isEdit}
            >
              <Button>
                <Icon type="upload" /> 点击上传附件
                </Button>
            </Upload>
          </FormItem>
        </Form>
      </div>
    )
  }
}
export default Form.create()(Index)
