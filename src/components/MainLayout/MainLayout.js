import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import styles from './style.css'
import { withRouter } from 'react-router'
import { menuData } from './menuData'
const SubMenu = Menu.SubMenu;
class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  renderMenu = () => {    
    return <Menu
      mode="inline"
      className={styles.menu}
    >
      {menuData.map((item, index) => {
        if (item.children) {
          return <SubMenu key={index} title={<span><Icon type="mail" /><span>{item.name}</span></span>}>
            {item.children.map((item2, index2) => {
              return <Menu.Item onClick={() => this.props.history.push(item2.url)} key={index2}>
                {item2.name}
              </Menu.Item>
            })}
          </SubMenu>
        } else {
          return <Menu.Item onClick={() => this.props.history.push(item.url)} key={index}>
            {item.name}
          </Menu.Item>
        }
      })}
    </Menu>
  }
  render() {
    return <div className={styles.all}>
      <div className={styles.head}>
        ssssssssss
      </div>
      <div className={styles.body}>
        {this.renderMenu()}
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    </div>
  }
}
export default withRouter(MainLayout)