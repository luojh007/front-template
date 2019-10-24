import React, { Component } from 'react'
import TabsChart from '../../../components/Chart/tabsChart'
export default class TabsBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [
        {
          month: "1",
          value: 3
        },
        {
          month: "2",
          value: 4
        },
        {
          month: "3",
          value: 3.5
        },
        {
          month: "4",
          value: 5
        },
      ],
      chartConfig: {
        xStr: 'month',
        yStr: 'value',
        tabsList: [{
          name: '权重',
          key: 'power',
        }, {
          name: '工时',
          key: 'houer',
        }, {
          name: '绩效金额',
          key: 'money',
        }, {
          name: '权重/工时比值',
          key: 'phb',
        }, {
          name: '绩效金额/工时比值',
          key: 'mhb',
        }]
      }
    }
  }
  render() {
    const { chartData, chartConfig } = this.state;
    const tabsChartProps = {
      chartConfig,
      chartData,
      onChange: (v) => {
        console.log(v);
      }
    }
    return (
      <div>
        <TabsChart {...tabsChartProps} />
      </div>
    )
  }
}
