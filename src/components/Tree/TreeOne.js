import React, { Component } from 'react'
import { TreeData } from './staticData'
import { arrHas } from '../../core/_utils/common'
import { Icon } from 'antd'
import styles from './style.less'
export default class TreeOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTreeIdMap: new Map([]), ///控制数节点展开，缩起
    }
  }
  subItemClick = (id) => {
    let { showTreeIdMap } = this.state
    showTreeIdMap.get(id) ? showTreeIdMap.set(id, false) : showTreeIdMap.set(id, true);
    this.setState({ showTreeIdMap });
  }
  //level--递归的层级--树的层级
  renderLeafDiv = (data, level) => {
    let list = data.children || data.module;
    let { showTreeIdMap } = this.state;
    return list.map((item, index) => {
      let l = level + 1;
      const itemStyle = {
        paddingLeft: l * 8,
        cursor: !item.leaf ? 'pointer' : 'text'
      }
      return <div >
        <div onClick={() => this.subItemClick(item.id)} className={styles.treeItem} style={itemStyle} key={index}>           {!item.leaf ? <Icon type="plus-square" style={{ marginRight: 5 }} /> : ''}{item.deptName || item.wardName}</div>
        {!item.leaf ?
          <div className={showTreeIdMap.get(item.id) ? styles.subShowItem : styles.subHidItem}>{this.renderLeafDiv(item, l)}</div> : ''}
      </div>
    })
  }
  render() {
    const data = TreeData.data;
    return (
      <div className={styles.tree}>
        {this.renderLeafDiv(data, 1)}
      </div>
    )
  }
}
