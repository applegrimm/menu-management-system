/**
 * ユーザー管理コンポーネント
 */

import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const UserManagement = () => {
  return (
    <div>
      <div className="page-header">
        <Title level={2} className="page-title">
          ユーザー管理
        </Title>
        <p>システムユーザーの登録・編集・削除を行います。（管理者権限が必要）</p>
      </div>
      <div>
        ユーザー管理機能（実装中...）
      </div>
    </div>
  );
};

export default UserManagement; 