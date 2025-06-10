/**
 * ログインコンポーネント
 * 主な仕様：
 * - ユーザー認証フォーム
 * - バリデーション
 * - エラーハンドリング
 */

import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

/**
 * ログインコンポーネント
 * @param {Function} onLogin - ログイン処理関数
 */
const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  /**
   * フォーム送信処理
   * @param {Object} values - フォーム値
   */
  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      const result = await onLogin(values);
      
      if (result.success) {
        message.success('ログインしました');
      } else {
        message.error(result.error);
      }
    } catch (error) {
      message.error('ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-form">
        <div className="login-title">
          メニュー管理システム
        </div>
        
        <Form
          name="login"
          size="large"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'ユーザー名を入力してください',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="ユーザー名"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'パスワードを入力してください',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="パスワード"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              ログイン
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '16px', 
          color: '#666',
          fontSize: '12px' 
        }}>
          初期管理者: admin / admin123
        </div>
      </Card>
    </div>
  );
};

export default Login; 