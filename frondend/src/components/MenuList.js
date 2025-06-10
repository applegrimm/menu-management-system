/**
 * メニュー一覧コンポーネント
 */

import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const MenuList = () => {
  return (
    <div>
      <div className="page-header">
        <Title level={2} className="page-title">
          メニュー管理
        </Title>
        <p>メニューの登録・編集・削除を行います。</p>
      </div>
      <div>
        メニュー一覧機能（実装中...）
      </div>
    </div>
  );
};

export default MenuList; 