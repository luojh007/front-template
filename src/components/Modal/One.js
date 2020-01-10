import React, { Component } from "react";
import {
  Form,
  Button,
  Modal,
  Input,
  Select,
  DatePicker,
  message,
  Radio
} from "antd";
// import { getPeopleItem } from "../../actions/main";
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
    // if (this.props.userId) {
    //   getPeopleItem({ userId: this.props.userId }).then(res => {
    //     if (!res.success) {
    //       return message.error(res.errMsg || "获取失败");
    //     }
    //     this.setState({ detail: res.data });
    //   });
    // }
  }
  onOkClick = type => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let params = {
          name: values.name,
          mobile: values.mobile,
          deptId: values.dept.key,
          deptName: values.dept.label,
          roleName: values.trainTypeId == "10000" ? "医院管理员" : "科室管理员",
          permissionId:
            values.trainTypeId == "10000"
              ? "1"
              : values.trainPrivilege.join(",")
        };
        this.props.onOk("admin", params, type, () => {
          this.props.form.resetFields();
        });
      }
    });
  };
  render() {
    const {
      title,
      onOk,
      onCancel,
      visible,
      modalLoading,
      modalType,
      deptList = []
    } = this.props;
    const { detail = {} } = this.state;
    const {
      getFieldDecorator,
      getFieldValue,
      getFieldsValue,
      setFieldsValue
    } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 16 }
      }
    };
    const baseInputStyle = {
      width: "100%"
    };
    return (
      <Modal
        width={520}
        title={title}
        onCancel={onCancel}
        visible={visible}
        destroyOnClose={true}
        maskClosable={false}
        footer={
          modalType != "detail" ? (
            <div>
              {!this.props.userId ? (
                <Button
                  loading={modalLoading}
                  onClick={() => this.onOkClick("again")}
                >
                  保存并继续新增
                </Button>
              ) : (
                ""
              )}
              <Button
                loading={modalLoading}
                type="primary"
                onClick={() => this.onOkClick()}
              >
                确定
              </Button>
            </div>
          ) : null
        }
      >
        <Form>
          <FormItem {...formItemLayout} label="姓名">
            {modalType != "detail" ? (
              getFieldDecorator("name", {
                initialValue: detail.name || "",
                rules: [
                  {
                    required: true,
                    message: "请填写名字",
                    whitespace: true
                  }
                ]
              })(
                <Input
                  placeholder="请输入"
                  maxLength={60}
                  {...baseInputStyle}
                />
              )
            ) : (
              <span>{detail.name}</span>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="手机号码">
            {modalType != "detail" ? (
              getFieldDecorator("mobile", {
                initialValue: detail.mobile || undefined,
                rules: [
                  { required: true, message: "请填写手机号码" },
                  {
                    pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/,
                    message: "手机号格式不正确"
                  }
                ]
              })(<Input {...baseInputStyle} placeholder="请输入" />)
            ) : (
              <span>{detail.mobile}</span>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="所属科室">
            {modalType != "detail" ? (
              getFieldDecorator("dept", {
                initialValue: detail.deptId
                  ? { key: detail.deptId, label: detail.departmentName }
                  : undefined,
                rules: [
                  {
                    required: true,
                    message: "请选择所属科室"
                  }
                ]
              })(
                <Select
                  labelInValue
                  {...baseInputStyle}
                  placeholder="请选择所属科室"
                  onChange={value => {
                    let trainPrivilege = getFieldValue("trainPrivilege")
                      ? [...getFieldValue("trainPrivilege")]
                      : [];
                    let beforeValue = getFieldValue("dept")
                      ? getFieldValue("dept").key
                      : "";
                    let resultTrainPrivilege = trainPrivilege.filter(
                      item => item != beforeValue
                    );
                    resultTrainPrivilege.push(value.key);
                    setFieldsValue({ trainPrivilege: resultTrainPrivilege });
                  }}
                >
                  {deptList.map((item, index) => {
                    return (
                      <Option key={item.bid} value={item.bid}>
                        {item.bname}
                      </Option>
                    );
                  })}
                </Select>
              )
            ) : (
              <span>{detail.departmentName}</span>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="角色类型">
            {modalType != "detail" ? (
              getFieldDecorator("trainTypeId", {
                initialValue: detail.trainTypeId
                  ? detail.trainTypeId.toString()
                  : "",
                rules: [{ required: true, message: "请选择角色类型" }]
              })(
                <Radio.Group>
                  <Radio value={"10000"}>医院管理员（全院管理）</Radio>
                  <Radio value={"10001"}>科室管理员</Radio>
                </Radio.Group>
              )
            ) : (
              <span>
                {detail.trainTypeId == "10000"
                  ? "医院管理员"
                  : detail.trainTypeId == "10001"
                  ? "科室管理员"
                  : ""}
              </span>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="管理范围">
            {modalType != "detail" ? (
              <div>
                <span
                  style={
                    getFieldValue("trainTypeId") != "10000"
                      ? { display: "none" }
                      : {}
                  }
                >
                  全院
                </span>
                <div
                  style={
                    getFieldValue("trainTypeId") != "10001"
                      ? { display: "none" }
                      : {}
                  }
                >
                  {getFieldDecorator("trainPrivilege", {
                    initialValue:
                      (detail.trainPrivilege &&
                        detail.trainPrivilege.split(",")) ||
                      [],
                    rules: [
                      {
                        required: getFieldValue("trainTypeId") == "10001",
                        message: "请选择管理范围"
                      }
                    ]
                  })(
                    <Select
                      {...baseInputStyle}
                      mode="multiple"
                      placeholder="请选择管理范围"
                    >
                      {deptList.map((item, index) => {
                        return (
                          <Option
                            disabled={
                              getFieldValue("dept")
                                ? item.bid == getFieldValue("dept").key
                                : false
                            }
                            key={index}
                            value={item.bid}
                          >
                            {item.bname}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </div>
              </div>
            ) : (
              <span>{detail.trainPrivilegeText}</span>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(AdminModal);