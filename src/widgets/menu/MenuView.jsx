import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  LogoutOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const MenuView = () => {
  let history = useHistory();

  const onLogOut = () => {
    history.push('/gallery');
  };
  return (
    <Router>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <Menu.Item key="0">
          <HomeOutlined />
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="1" onClick={() => console.log('panel clicked')}>
          <UserOutlined />
          <Link to="/user">Panel</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <VideoCameraOutlined />
          <Link to="/gallery">Gallery</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <LogoutOutlined />
          <span className="nav-text" onClick={() => onLogOut()}>
            Log Out
          </span>
        </Menu.Item>
      </Menu>
    </Router>
  );
};

export default MenuView;
