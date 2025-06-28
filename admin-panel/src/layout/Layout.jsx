import React, { useContext, useState } from 'react';
import {
  DesktopOutlined,
  LogoutOutlined,
  PieChartOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout as AntLayout, Menu, theme, message, Button } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const { Header, Content, Footer, Sider } = AntLayout;

// Function to create menu items
function getItem(label, key, icon, children) {
  return {
    key, // will be used as path
    icon,
    children,
    label,
  };
}

// Sidebar menu items
const items = [
  getItem('Dashboard', '/', <PieChartOutlined />),
  getItem('Portfolio', '/portfolio', <ProfileOutlined />),
  getItem('Careers', '/careers', <DesktopOutlined />),
];

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutAdmin } = useContext(AuthContext)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Map routes to breadcrumb titles
  const breadcrumbTitleMap = {
    '/': 'Dashboard',
    '/portfolio': 'Portfolio',
    '/careers': 'Careers',
  };

  const currentPath = location.pathname;
  const pageTitle = breadcrumbTitleMap[currentPath] || 'Dashboard';

  // Handle sidebar menu item click
  const onMenuClick = ({ key }) => {
    navigate(key);
  };





  return (
    <AntLayout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      <ToastContainer />

      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          {collapsed ? (
            <img
              src="/dhanwisadmin/favicon.png"
              alt="logo"
              style={{ width: 32, height: 32, objectFit: 'contain',margin:'0 auto' }}
            />
          ) : (
            <img
              src="/dhanwisadmin/Techinfo 1.png"
              alt="logo"
              style={{ width: '100%',  objectFit: 'contain' }}
            />
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[currentPath]}
          selectedKeys={[currentPath]}
          items={items}
          onClick={onMenuClick}
        />
      </Sider>

      <AntLayout>
        <Header style={{ padding: 0, background: colorBgContainer }} >
          <div className='flex justify-between px-4 py-4  '>
            <h1 className='font-bold text-xl uppercase'>Admin Panel</h1>
            <Button onClick={() => logoutAdmin()} variant='solid' color='danger' type=''>Log Out</Button>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[{ title: 'Dhanwis' }, { title: pageTitle }]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()} Created by Dhanwis techinfo solution
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
