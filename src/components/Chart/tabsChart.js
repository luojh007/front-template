import React, { Component } from 'react'
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import { Tabs } from 'antd'
const { TabPane } = Tabs;

export default class TabsChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { chartConfig, chartData = [] } = this.props;
    const { tabsList, xStr, yStr, } = chartConfig;
    const cols = {
      [yStr]: {
        min: 0
      },
      [xStr]: {
        range: [0, 1]
      }
    };
    return (
      <div>
        <Tabs onChange={key => this.props.onChange(key)}>
          {tabsList.map((item, index) => {
            return <TabPane tab={item.name} key={item.key}></TabPane>
          })}
        </Tabs>
        <Chart height={400} data={chartData} scale={cols} forceFit>
          <Axis name={xStr} />
          <Axis name={xStr} />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom type="line" position={`${xStr}*${yStr}`} size={2} shape={'smooth'} />
          <Geom
            type="point"
            position={`${xStr}*${yStr}`}
            size={4}
            shape={"circle"}
            style={{
              stroke: "#fff",
              lineWidth: 1
            }}
          />
        </Chart>
      </div>
    )
  }
}
