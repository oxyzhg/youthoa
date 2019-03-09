import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';
import './style.scss';

class Manager extends Component {
  state = {
    current: 'app'
  };
  handleClick = e => {
    this.setState({
      current: e.key
    });
  };
  render() {
    return (
      <BasicLayout>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.SubMenu title="管理员管理" disabled>
            <Menu.Item key="/users">
              <Link to="/users">用户管理</Link>
            </Menu.Item>
            <Menu.Item key="/roles">
              <Link to="/roles">角色管理</Link>
            </Menu.Item>
            <Menu.Item key="/perms">
              <Link to="/perms">权限管理</Link>
            </Menu.Item>
          </Menu.SubMenu>
          {/* 系统内数据管理入口 */}
          <Menu.SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="appstore" />
                办公系统管理
              </span>
            }
          >
            <Menu.Item key="expt-signin-tb">
              <Link to="/signin/export">导出签到数据表</Link>
            </Menu.Item>
            <Menu.Item key="/phonebook/export">
              <Link to="/phonebook/export">导出联系方式表</Link>
            </Menu.Item>
            <Menu.Item key="/phonebook/import">
              <Link to="/phonebook/import">导入联系方式表</Link>
            </Menu.Item>
          </Menu.SubMenu>
          {/* 系统外数据管理入口 */}
          <Menu.SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Icon type="setting" />
                其他数据管理
              </span>
            }
          >
            <Menu.Item key="impt-hygiene-tb">
              <Link to="/manage/impt-hygiene-tb">导入卫生表</Link>
            </Menu.Item>
            <Menu.Item key="del-hygiene">
              <Link to="/manage/del-hygiene">删除卫生成绩</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <div>{this.props.children}</div>
      </BasicLayout>
    );
  }
}

export default Manager;
