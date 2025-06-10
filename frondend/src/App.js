/**
 * メニュー管理システム メインアプリケーション
 * 主な仕様：
 * - ルーティング制御
 * - 認証状態管理
 * - レイアウト管理
 * - GitHub Pages + ローカルバックエンド対応
 * 制限事項：
 * - シンプルなローカル状態管理（大規模時はReduxなど検討）
 */

import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

function App() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <Title level={1}>メニュー管理システム</Title>
      <p>テスト表示 - GitHub Pages動作確認</p>
      <p>現在時刻: {new Date().toLocaleString('ja-JP')}</p>
      <p>環境: {window.location.hostname}</p>
    </div>
  );
}

export default App; 