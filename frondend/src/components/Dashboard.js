/**
 * ダッシュボードコンポーネント
 * 主な仕様：
 * - システム概要表示
 * - 最近の更新情報
 * - 統計情報
 */

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, List, Typography, Spin } from 'antd';
import { 
  ShoppingOutlined, 
  MenuOutlined, 
  UserOutlined,
  TrophyOutlined 
} from '@ant-design/icons';
import { materialsAPI, menusAPI } from '../services/api';

const { Title } = Typography;

/**
 * ダッシュボードコンポーネント
 */
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMaterials: 0,
    totalMenus: 0,
    recentMenus: [],
    recentMaterials: [],
  });

  /**
   * データ読み込み
   */
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // 統計情報取得
        const [materials, menus] = await Promise.all([
          materialsAPI.getMaterials({ limit: 10 }),
          menusAPI.getMenus({ limit: 10 }),
        ]);

        setStats({
          totalMaterials: materials.length,
          totalMenus: menus.length,
          recentMenus: menus.slice(0, 5),
          recentMaterials: materials.slice(0, 5),
        });
      } catch (error) {
        console.error('データ読み込みエラー:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <Title level={2} className="page-title">
          ダッシュボード
        </Title>
        <p>メニュー管理システムへようこそ。システムの概要と最新情報をご確認ください。</p>
      </div>

      {/* 統計カード */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="登録材料数"
              value={stats.totalMaterials}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="登録メニュー数"
              value={stats.totalMenus}
              prefix={<MenuOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="総店舗数"
              value={30}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="運用ステータス"
              value="正常"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 最新情報 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="最近更新されたメニュー" size="small">
            <List
              dataSource={stats.recentMenus}
              renderItem={(menu) => (
                <List.Item>
                  <List.Item.Meta
                    title={menu.name}
                    description={`販売価格: ${menu.selling_price}円 | 更新日: ${new Date(menu.last_updated).toLocaleDateString('ja-JP')}`}
                  />
                </List.Item>
              )}
              locale={{ emptyText: '登録されたメニューがありません' }}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="最近更新された材料" size="small">
            <List
              dataSource={stats.recentMaterials}
              renderItem={(material) => (
                <List.Item>
                  <List.Item.Meta
                    title={material.name}
                    description={`単価: ${material.unit_price}円/${material.unit} | 更新日: ${new Date(material.last_updated).toLocaleDateString('ja-JP')}`}
                  />
                </List.Item>
              )}
              locale={{ emptyText: '登録された材料がありません' }}
            />
          </Card>
        </Col>
      </Row>

      {/* システム情報 */}
      <Row style={{ marginTop: '24px' }}>
        <Col span={24}>
          <Card title="システム情報" size="small">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <div><strong>バージョン:</strong> 1.0.0</div>
              </Col>
              <Col xs={24} md={8}>
                <div><strong>データベース:</strong> SQLite</div>
              </Col>
              <Col xs={24} md={8}>
                <div><strong>対応店舗数:</strong> 30店舗</div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 