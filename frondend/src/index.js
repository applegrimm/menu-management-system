/**
 * メニュー管理システム フロントエンド エントリーポイント
 * 主な仕様：
 * - Reactアプリケーションの初期化
 * - ルーティング設定
 * - Ant Designテーマ設定
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import jaJP from 'antd/locale/ja_JP';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ConfigProvider locale={jaJP}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
); 