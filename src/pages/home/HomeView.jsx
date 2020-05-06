import React from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  LogoutOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import {
  LogInView,
  UserView,
  GalleryView,
  LawyerPanelView,
  UserPanelView,
} from '../';
import { PrivateRoute } from '../../js';
import homeController from './homeController';

const HomeView = () => {
  const { getWindowDimensions, onLogOut } = homeController();
  const { Header, Content, Footer, Sider } = Layout;
  const { height, width } = getWindowDimensions();
  const history = useHistory();

  return (
    <Layout style={{ height: '100%', minHeight: '100%' }}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="0">
            <HomeOutlined />
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <UserOutlined />
            <Link to="/user">Panel</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <VideoCameraOutlined />
            <Link to="/gallery">Gallery</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <LogoutOutlined />
            <span className="nav-text" onClick={() => onLogOut(history)}>
              Log out
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
            <PrivateRoute
              path="/lawyer-panel"
              component={LawyerPanelView}
              role="lawyer"
            />
            <PrivateRoute
              path="/user-panel"
              component={UserPanelView}
              role="user"
            />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default HomeView;
