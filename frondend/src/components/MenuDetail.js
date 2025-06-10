/**
 * メニュー詳細コンポーネント
 */

import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const MenuDetail = () => {
  return (
    <div>
      <div className="page-header">
        <Title level={2} className="page-title">
          メニュー詳細
        </Title>
        <p>メニューの詳細情報と原価計算を表示します。</p>
      </div>
      <div>
        メニュー詳細機能（実装中...）
      </div>
    </div>
  );
};

export default MenuDetail; 