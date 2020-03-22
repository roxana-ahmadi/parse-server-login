import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  LogoutOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { LogInView, UserView, GalleryView } from '../';
import homeController from './homeController';

const HomeView = () => {
  const { getWindowDimensions, PrivateRoute, onLogOut } = homeController();
  const { Header, Content, Footer, Sider } = Layout;
  const { height, width } = getWindowDimensions();

  return (
    <Router>
      <Layout style={{ height: '100%', minHeight: '100%' }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="0">
              <HomeOutlined />
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="1" onClick={() => console.log('click')}>
              <UserOutlined />
              <Link to="/user">User</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <Link to="/gallery">Gallery</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <LogoutOutlined />
              <span className="nav-text" onClick={() => onLogOut()}>
                LogOut
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          />
          <Content
            style={{
              margin: '24px 16px 0',
              padding: '24',
              width: width,
              height: height,
            }}
          >
            <Switch>
              <Route exact path="/" component={() => <div>Home Page</div>} />
              <Route path="/login" component={LogInView} />
              <Route path="/gallery" component={GalleryView} />
              <PrivateRoute path="/user" component={UserView} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default HomeView;
