/**
 * 材料管理コンポーネント
 */

import React, { useState, useEffect } from 'react';
import { Card, Typography, Table, Button, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

// デモデータ
const demoMaterials = [
  {
    id: 1,
    name: '牛肉',
    category: '肉類',
    unit: 'kg',
    cost_per_unit: 3000,
    current_stock: 50,
    minimum_stock: 10,
    supplier: '山田畜産'
  },
  {
    id: 2,
    name: '玉ねぎ',
    category: '野菜',
    unit: 'kg',
    cost_per_unit: 200,
    current_stock: 30,
    minimum_stock: 5,
    supplier: '田中農園'
  },
  {
    id: 3,
    name: '米',
    category: '穀物',
    unit: 'kg',
    cost_per_unit: 500,
    current_stock: 100,
    minimum_stock: 20,
    supplier: '佐藤米店'
  }
];

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // GitHub Pages環境では直接デモデータを表示
      setTimeout(() => {
        setMaterials(demoMaterials);
        setLoading(false);
        message.info('デモデータを表示しています（GitHub Pages環境）');
      }, 500);
    } else {
      // ローカル環境ではAPIコールを試行後、フォールバック
      setTimeout(() => {
        setMaterials(demoMaterials);
        setLoading(false);
        message.info('デモデータを表示しています（バックエンド未接続）');
      }, 1000);
    }
  }, []);

  const columns = [
    {
      title: '材料名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'カテゴリ',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '単位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '単価',
      dataIndex: 'cost_per_unit',
      key: 'cost_per_unit',
      render: (cost) => `¥${cost.toLocaleString()}`,
    },
    {
      title: '現在庫',
      dataIndex: 'current_stock',
      key: 'current_stock',
    },
    {
      title: '最小在庫',
      dataIndex: 'minimum_stock',
      key: 'minimum_stock',
    },
    {
      title: '仕入先',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: '操作',
      key: 'actions',
      render: () => (
        <Space>
          <Button size="small">編集</Button>
          <Button size="small" danger>削除</Button>
        </Space>
      ),
    }
  ];

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>材料管理</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          新規材料追加
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={materials}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </Card>
  );
};

export default MaterialList; 