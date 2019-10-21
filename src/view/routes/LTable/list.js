//绩效指标
import React, { Component } from 'react'
import BreadcrumbList from "../../../components/BreadcrumbList";
import { Tabs, Select, Input, Button, Table } from 'antd'
import styles from './style.less'
import { PAGE_SIZE_OPTIONS } from "../../../core/constants";
import { getTableList } from '../../../actions/Table/list'
import moment from 'moment'
const { TabPane } = Tabs
const { Search } = Input;
const { Option } = Select;
const dateFomate = "YYYY-MM-DD";
export default class TargetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterParams: {
        dimension: '',
        tabKey: '',
        source: '',
        search: '',
      },
      pagination: {
        showSizeChanger: true,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        current: 1,
        pageSize: 10
      },
      tableData: [],
      loading: false,
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.setState({ loading: true });
    let { pagination, filterParams } = this.state;
    let params = {
      ...filterParams,
      pageSize: pagination.pageSize,
      pageNum: pagination.current
    };
    getTableList(params).then(res => {
      if (res.status != "SUCCESS") {
        message.error(res.info || "获取失败");
        return;
      }
      pagination.total = res.data.total;
      this.setState({ tableData: res.data.list, loading: false, pagination });
    });
  }
  onFilterChange = (value, key, options) => {
    let { filterParams } = this.state;
    if (key === "checkbox") {
      filterParams[key] = value.target.checked;
    } else if (key === "singleTime") {
      filterParams[key] = moment(value).format("YYYY-MM-DD");
    } else if (key === "rangeTime") {
      filterParams[options[0]] = value.length
        ? moment(value[0]).format(dateFomate) + " " + "00:00:00"
        : "";
      filterParams[options[1]] = value.length
        ? moment(value[1]).format(dateFomate) + " " + "23:59:59"
        : "";
    } else {
      filterParams[key] = value;
    }
    this.setState({ filterParams }, () => {
      this.getData();
    });
  };
  getColumns = () => {
    let result = [];
    result = [
      {
        title: "工号",
        dataIndex: "jobNum"
      },
      {
        title: "姓名",
        dataIndex: "nurseName"
      },
      {
        title: "性别",
        dataIndex: "sex",
        render: text => {
          return text == 1 ? "男" : "女";
        }
      },
      {
        title: "学历",
        dataIndex: "nurseNameStr"
      },
      {
        title: "资格证",
        dataIndex: "certificateTypeStr"
      },
      {
        title: "证书名称",
        dataIndex: "certificateName",
        render: (text, { certificateNameStr }) => {
          return certificateNameStr || text
        }
      },
      {
        title: "证书编号",
        dataIndex: "certificateNum"
      },
      {
        title: "发证机构",
        dataIndex: "certificateOrgan"
      },
      {
        title: "发证日期",
        dataIndex: "getDate",
        render: (text, record) => {
          return moment(record.getDate).format(dateFomate);
        }
      },
      {
        title: "有效期至",
        dataIndex: "termOfValidity",
        render: (text, record) => {
          return record.termOfValidity
            ? moment(record.termOfValidity).format(dateFomate)
            : "永久有效";
        }
      },
      {
        title: "剩余时间",
        dataIndex: "remainingTime"
      },
      {
        title: "注册机构",
        dataIndex: "registerHospitalName"
      }
    ];
    return result;
  };
  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState(
      {
        pagination: pager
      },
      () => {
        this.getData();
      }
    );
  };
  render() {
    const {
      loading,
      pagination,
      tableData,
      filterParams
    } = this.state;
    const filterAction = (<div>
      <Select
        placeholder="统计维度"
        allowClear
        style={{ width: 120, marginRight: 15 }} onChange={date => this.onFilterChange(date, "dimension")}>
        <Option value="病区">病区</Option>
        <Option value="护士">护士</Option>
      </Select>
      <Select
        placeholder="来源"
        allowClear
        style={{ width: 160, marginRight: 15 }} onChange={date => this.onFilterChange(date, "source")}>
        <Option value="医嘱">医嘱</Option>
        <Option value="文书">文书</Option>
        <Option value="体征">体征</Option>
        <Option value="护理计划">护理计划</Option>
        <Option value="317护宣教">317护宣教</Option>
        <Option value="317护患者满意度">317护患者满意度</Option>
        <Option value="护理档案">护理档案</Option>
        <Option value="不良事件">不良事件</Option>
        <Option value="质控检查">质控检查</Option>
        <Option value="工作预约">工作预约</Option>
        <Option value="质量检查">质量检查</Option>
      </Select>
      <Search
        placeholder="搜索"
        onSearch={date => this.onFilterChange(date, "search")}
        style={{ width: 200, marginRight: 15 }}
      />
      <Button style={{ marginRight: 15 }}>导入</Button>
      <Button style={{ marginRight: 15 }}>导出模版</Button>
    </div>)
    return (
      <div>
        <BreadcrumbList list={[{ name: "量化指标设置" }]} />
        <div className={styles.filter}>
          <Tabs tabBarExtraContent={filterAction}>
            <TabPane tab="全部" key="1">
            </TabPane>
            <TabPane tab="已启用" key="2">
            </TabPane>
            <TabPane tab="未启用" key="3">
            </TabPane>
          </Tabs>
        </div>
        <Table
          className={styles.tableBoxPd}
          columns={this.getColumns()}
          dataSource={tableData}
          pagination={pagination}
          rowKey={record => record.id}
          loading={loading}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}
