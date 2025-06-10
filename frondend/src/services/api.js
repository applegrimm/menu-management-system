/**
 * メニュー管理システム API通信サービス
 * 主な仕様：
 * - Axiosを使用したHTTP通信
 * - JWT認証ヘッダー自動付与
 * - エラーハンドリング
 * 制限事項：
 * - ローカルストレージにトークン保存（本番では適切なセキュリティ対策が必要）
 */

import axios from 'axios';
import { message } from 'antd';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

// Axiosインスタンス作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター（認証ヘッダー自動付与）
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 認証エラーの場合はログアウト
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      message.error('認証の有効期限が切れました。再度ログインしてください。');
    } else if (error.response?.data?.error) {
      message.error(error.response.data.error);
    } else if (error.message) {
      message.error(`通信エラー: ${error.message}`);
    } else {
      message.error('予期しないエラーが発生しました');
    }
    return Promise.reject(error);
  }
);

// 認証API
export const authAPI = {
  /**
   * ログイン
   * @param {Object} credentials - ログイン情報
   * @param {string} credentials.username - ユーザー名
   * @param {string} credentials.password - パスワード
   * @returns {Promise} レスポンス
   */
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  /**
   * 現在のユーザー情報取得
   * @returns {Promise} ユーザー情報
   */
  getCurrentUser: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  /**
   * ユーザー一覧取得（管理者のみ）
   * @returns {Promise} ユーザー一覧
   */
  getUsers: async () => {
    const response = await apiClient.get('/auth/users');
    return response.data;
  },

  /**
   * ユーザー作成（管理者のみ）
   * @param {Object} userData - ユーザーデータ
   * @returns {Promise} 作成されたユーザー
   */
  createUser: async (userData) => {
    const response = await apiClient.post('/auth/users', userData);
    return response.data;
  },

  /**
   * ユーザー更新（管理者のみ）
   * @param {number} userId - ユーザーID
   * @param {Object} userData - 更新データ
   * @returns {Promise} 更新されたユーザー
   */
  updateUser: async (userId, userData) => {
    const response = await apiClient.put(`/auth/users/${userId}`, userData);
    return response.data;
  },

  /**
   * ユーザー削除（管理者のみ）
   * @param {number} userId - ユーザーID
   * @returns {Promise} 削除結果
   */
  deleteUser: async (userId) => {
    await apiClient.delete(`/auth/users/${userId}`);
  },

  /**
   * パスワード変更
   * @param {string} currentPassword - 現在のパスワード
   * @param {string} newPassword - 新しいパスワード
   * @returns {Promise} 変更結果
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await apiClient.post('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  },
};

// 材料API
export const materialsAPI = {
  /**
   * 材料一覧取得
   * @param {Object} params - クエリパラメータ
   * @returns {Promise} 材料一覧
   */
  getMaterials: async (params = {}) => {
    const response = await apiClient.get('/materials', { params });
    return response.data;
  },

  /**
   * 材料詳細取得
   * @param {number} materialId - 材料ID
   * @returns {Promise} 材料詳細
   */
  getMaterial: async (materialId) => {
    const response = await apiClient.get(`/materials/${materialId}`);
    return response.data;
  },

  /**
   * 材料作成
   * @param {Object} materialData - 材料データ
   * @returns {Promise} 作成された材料
   */
  createMaterial: async (materialData) => {
    const response = await apiClient.post('/materials', materialData);
    return response.data;
  },

  /**
   * 材料更新
   * @param {number} materialId - 材料ID
   * @param {Object} materialData - 更新データ
   * @returns {Promise} 更新された材料
   */
  updateMaterial: async (materialId, materialData) => {
    const response = await apiClient.put(`/materials/${materialId}`, materialData);
    return response.data;
  },

  /**
   * 材料削除
   * @param {number} materialId - 材料ID
   * @returns {Promise} 削除結果
   */
  deleteMaterial: async (materialId) => {
    await apiClient.delete(`/materials/${materialId}`);
  },
};

// メニューAPI
export const menusAPI = {
  /**
   * メニュー一覧取得
   * @param {Object} params - クエリパラメータ
   * @returns {Promise} メニュー一覧
   */
  getMenus: async (params = {}) => {
    const response = await apiClient.get('/menus', { params });
    return response.data;
  },

  /**
   * メニュー詳細取得
   * @param {number} menuId - メニューID
   * @returns {Promise} メニュー詳細
   */
  getMenuDetail: async (menuId) => {
    const response = await apiClient.get(`/menus/${menuId}`);
    return response.data;
  },

  /**
   * メニュー作成
   * @param {Object} menuData - メニューデータ
   * @returns {Promise} 作成されたメニュー
   */
  createMenu: async (menuData) => {
    const response = await apiClient.post('/menus', menuData);
    return response.data;
  },

  /**
   * メニュー更新
   * @param {number} menuId - メニューID
   * @param {Object} menuData - 更新データ
   * @returns {Promise} 更新されたメニュー
   */
  updateMenu: async (menuId, menuData) => {
    const response = await apiClient.put(`/menus/${menuId}`, menuData);
    return response.data;
  },

  /**
   * メニュー削除
   * @param {number} menuId - メニューID
   * @returns {Promise} 削除結果
   */
  deleteMenu: async (menuId) => {
    await apiClient.delete(`/menus/${menuId}`);
  },

  /**
   * メニューに材料追加
   * @param {number} menuId - メニューID
   * @param {Object} materialData - 材料データ
   * @returns {Promise} 追加結果
   */
  addMenuMaterial: async (menuId, materialData) => {
    await apiClient.post(`/menus/${menuId}/materials`, materialData);
  },

  /**
   * メニューから材料削除
   * @param {number} menuId - メニューID
   * @param {number} materialId - 材料ID
   * @returns {Promise} 削除結果
   */
  removeMenuMaterial: async (menuId, materialId) => {
    await apiClient.delete(`/menus/${menuId}/materials/${materialId}`);
  },

  /**
   * レシピ工程追加
   * @param {number} menuId - メニューID
   * @param {Object} recipeData - レシピデータ
   * @returns {Promise} 追加結果
   */
  addRecipeStep: async (menuId, recipeData) => {
    await apiClient.post(`/menus/${menuId}/recipes`, recipeData);
  },
};

export default apiClient; 