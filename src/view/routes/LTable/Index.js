import React, { Component } from 'react'
import { Table, Button, Spin } from 'antd'
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      pagination: {
        // ...pagination
      },
      tableData: [],
      filterParams: {
        name: "",
        nurseName: "",
        remainingTime: "",
        type: "",
        unitId: ""
      }
    };
  }
  setColums = () => {
    return [
      {
        title: "姓名",
        dataIndex: "name"
      },
      {
        title: "手机号",
        dataIndex: "phone"
      },
      {
        title: "性别",
        dataIndex: "sex"
      },
      {
        title: "当前科室",
        dataIndex: "dept"
      },
      {
        title: "参培年份",
        dataIndex: "year"
      },
      {
        title: "基地专业",
        dataIndex: "base"
      },
      {
        title: "操作",
        dataIndex: "opearte"
      }
    ];
  }
  getData = () => {
    this.setState({ loading: true });
    let params = {};
    getTableData(params).then(data => {
      const pagination = { ...this.state.pagination };
      let res = data.data;
      pagination.total = res.totalCount;
      pagination.pageSize = params ? params.pageSize : pagination.pageSize;
      pagination.current = params ? params.currentPage : pagination.currentPage;
      this.setState({
        loading: false,
        data: res.result,
        pagination
      });
    });
  };
  handleTableChange = pagination => {
    const pager = { ...this.state.pagination };
    pager.currentPage = pagination.current;
    this.setState({
      pagination: pager
    });
    this.getData({
      pageSize: pagination.pageSize,
      currentPage: pagination.current
    });
  };
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
  render() {
    const { tableData = [], pagination, loading, } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      }
    };
    return (
      <div>
        <Button>aaa</Button>
        {/* <Spin /> */}
        {/* <Table rowSelection={rowSelection} columns={this.setColums()} dataSource={tableData} />, */}

        {/* <Table
          // rowSelection={rowSelection}
          // columns={this.setColums()}
          // dataSource={this.state.data}
          // bordered={true}
          // style={{ marginTop: 10 }}
          // pagination={this.state.pagination}
          // loading={this.state.loading}
          // onChange={this.handleTableChange}
          // rowKey={(record, index) => index}
        /> */}
      </div>
    )
  }
}