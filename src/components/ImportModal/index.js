import React, { Component } from "react";
import { Modal, Upload, Button, Icon, message } from "antd";
import styles from "./style.less";
const resourceDomain = '//staff-sit.317hu.com';
export default class ImportModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileStatus: 0, //文件上传状态    0-未上传，2-导入完成，-1-导入失败（格式不正确）
      fileList: []
    };
    this.uploadProps = {
      action: `${resourceDomain}/nurse-staff-web/import/importNurseDossier`,
      name: "file",
      showUploadList: false,
      onChange: file => this.fileOnChange(file, "fileList"),
      beforeUpload: file => this.fileBeforeUpload(file, "fileList")
    };
  }
  fileOnChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    } else if (info.file.status === "done") {
      let res = info.file.response;
      if (res.status != "SUCCESS") {
        this.setState({ fileStatus: -1 });
        return message.error(res.info || "上传失败");
      }
      message.success(`${info.file.name}上传成功`);
      let errUrl = resourceDomain + "/" + res.data.uploadUrl;
      this.setState({
        fileStatus: 2,
        errUrl,
        addNum: res.data.count || 0,
        updateNum: res.data.updateNum || 0,
        errorNum: res.data.errorNum || 0,
        insertNum: res.data.insertNum || 0,
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} 上传失败,请检查网络`);
    }
  };
  fileBeforeUpload = (file, key) => {
    let isType;
    let isSize;
    if (file && file.type && file.size) {
      isType = file.type.indexOf("sheet") > -1;
      isSize = file.size / 1024 / 1024 <= 20;
    } else {
      return false;
    }
    if (!isSize) {
      message.error("文件最大20M");
      return false;
    }
    if (!isType) {
      message.error("文件格式仅支持xsl");
      return false;
    }
    return isType && isSize;
  };
  render() {
    const { title, onCancel } = this.props;
    const {
      fileStatus,
      addNum = 0,
      updateNum = 0,
      insertNum = 0,
      errorNum = 0,
      errUrl
    } = this.state;
    //初始化，默认的导入div
    const initDiv = <div className={styles.importBox}>
      <p className={styles.importTitle}>导入人员：</p>
      <div className={styles.importValue}>
        <Upload {...this.uploadProps}>
          <Button icon="plus" type="primary" ghost>
            选择导入文件
      </Button>
        </Upload>
        <div className={styles.importDetail}>
          <p>* 包括实习生、进修生、规培生等所有护士的档案信息 </p>
          <p>* 文件支持 xsl 格式，大小不超过2M</p>
        </div>
        {fileStatus == -1 ? (
          <div classNam={styles.importBoxErr}>
            <p>文件错误！表格内容请参考“护士档案模版”</p>
          </div>
        ) : (
            ""
          )}
      </div>
    </div>
    //导入完成展示结果页面
    const completeDiv = <div>
      <div className={styles.importSuccessBox}>
        {errorNum > 0 ? (
          <Icon
            type="exclamation-circle"
            theme="filled"
            style={{ color: "orange", fontSize: 26 }}
          />
        ) : (
            <Icon
              type="check-circle"
              theme="filled"
              style={{ color: "green", fontSize: 26 }}
            />
          )}
        <div className={styles.importSuccessInfo}>
          <p>成功导入{addNum}个普通护士档案</p>
          <p>
            新增{insertNum}个，更新{updateNum}个
      </p>
        </div>
      </div>
      {errorNum > 0 ? (
        <div className={styles.importBoxErrDetail}>
          <p>有{errorNum}张照片导入失败</p>
          <a href={errUrl}>下载失败报表</a>
        </div>
      ) : (
          ""
        )}
    </div>
    return (
      <Modal
        width={650}
        visible={true}
        onCancel={onCancel}
        title={title}
        footer={null}
        destroyOnClose={true}
        maskClosable={false}
      >
        {fileStatus == 2 ? completeDiv : initDiv}
      </Modal>
    );
  }
}
