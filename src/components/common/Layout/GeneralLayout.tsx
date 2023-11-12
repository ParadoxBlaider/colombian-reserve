import React, { useState, ReactNode, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  GlobalOutlined,
  TagOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoCompany from '../../../assets/images/login/logo.png'
import './GeneralLayout.css'
import Footer from '../Footer';
import { useMemo } from 'react';

const { Header, Sider, Content } = Layout;

interface GeneralLayoutProps {
  children: ReactNode;
}


interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  title: string;
}

const GeneralLayout: React.FC<GeneralLayoutProps> = ({ children }) => {
  const menuItems: MenuItem[] = useMemo(() => [
    {
      key: 'hotels',
      icon: <GlobalOutlined />,
      label: 'Hoteles',
      title: 'Hoteles',
    },
    {
      key: 'rooms',
      icon: <TagOutlined />,
      label: 'Habitaciones',
      title: 'Habitaciones',
    },
    {
      key: 'bookings',
      icon: <ScheduleOutlined />,
      label: 'Reservas',
      title: 'Reservas',
    },
  ], []);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState<string>('');
  const navigation = useNavigate();
  const location = useLocation();
  const pathKey = location.pathname.substring(1) ? location.pathname.substring(1) : 'hotels';

  const handleMenuClick = (key: string) => {
    navigation(`/${key}`);
  };

  const onLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = `${window.location.origin}`
  }

  useEffect(() => {
    const menuItem = menuItems.find((item) => `/${item.key}` === location.pathname);
    if (menuItem) {
      setPageTitle(menuItem.title);
    }
    if (!menuItem) {
      setPageTitle('Hoteles')
    }
  }, [location.pathname, menuItems]);

  return (
    <Layout className="!h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} >
        <div className="demo-logo-vertical">
          <img src={LogoCompany} alt="Logo Company" />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[pathKey]} defaultSelectedKeys={['1']}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon} title={item.label} onClick={() => handleMenuClick(item.key)}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} className='flex'>
          <div className='flex'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined className='text-white' /> : <MenuFoldOutlined className='text-white' />}
              onClick={() => setCollapsed(!collapsed)}
              className='text-white w-[64px] h-[64px] text-base'
            />
            <h1 className='text-white pl-4 text-2xl font-bold mb-1 self-center'>{pageTitle}</h1>
          </div>
          <div className='flex-1'></div>
          <div className='w-[50px]'>

            <Button
              title='Cerrar sesión'
              type="text"
              icon={<LogoutOutlined className='text-white center' />}
              onClick={onLogout}
              className='text-white w-full h-[64px] text-base'
            />
          </div>
        </Header>
        <Content
          className='overflow-auto'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default GeneralLayout;