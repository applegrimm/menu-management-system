/**
 * アプリケーションレイアウトコンポーネント
 * 主な仕様：
 * - ナビゲーションメニュー
 * - ユーザー情報表示
 * - レスポンシブ対応
 */

import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Space, Button } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

/**
 * アプリケーションレイアウト
 * @param {Object} user - ユーザー情報
 * @param {Function} onLogout - ログアウト処理
 * @param {ReactNode} children - 子コンポーネント
 */
const AppLayout = ({ user, onLogout, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // メニュー項目定義
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'ダッシュボード',
    },
    {
      key: '/materials',
      icon: <ShoppingOutlined />,
      label: '材料管理',
    },
    {
      key: '/menus',
      icon: <MenuOutlined />,
      label: 'メニュー管理',
    },
  ];

  // 管理者のみのメニュー項目
  if (user?.role === 'admin') {
    menuItems.push({
      key: '/users',
      icon: <UserOutlined />,
      label: 'ユーザー管理',
    });
  }

  // ユーザーメニュー
  const userMenu = (
    <Menu
      items={[
        {
          key: 'profile',
          label: `${user?.username} (${getRoleDisplayName(user?.role)})`,
          disabled: true,
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'ログアウト',
          onClick: onLogout,
        },
      ]}
    />
  );

  /**
   * ロール表示名取得
   * @param {string} role - ロール
   * @returns {string} 表示名
   */
  function getRoleDisplayName(role) {
    switch (role) {
      case 'admin':
        return '管理者';
      case 'head_office':
        return '本部';
      case 'store_user':
        return '店舗';
      default:
        return role;
    }
  }

  /**
   * メニュークリック処理
   * @param {Object} item - メニュー項目
   */
  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{
          height: '32px',
          margin: '16px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}>
          {collapsed ? 'M' : 'Menu'}
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      
      <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
        <Header style={{
          padding: '0 16px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Space style={{ cursor: 'pointer' }}>
              <Avatar size="small" icon={<UserOutlined />} />
              <span>{user?.username}</span>
            </Space>
          </Dropdown>
        </Header>
        
        <Content style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          background: '#fff',
          borderRadius: '8px',
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout; 