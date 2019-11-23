import axios from 'axios';
import { UserStorage } from '../services/storages/UserStorage';
import history from './history';

const getAuthHeader = () => {
  const token = UserStorage.getAuthorization();

  return token ? { Authorization: `Bearer ${token}` } : {};
};

const interceptUnAuthorizedRequest = (requestInstance) => {
  requestInstance.interceptors.response.use((response) => response,
    (error) => {
      if (error.response.status === 401) {
        return history.push('/auth');
      }
      return Promise.reject(error);
    });
};


export const apiClient = (baseURL, config = {}, isAuthHeader = true) => {
  const authHeader = isAuthHeader ? getAuthHeader() : {};

  const baseConfig = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      ...authHeader,
    },
  };

  const requestInstance = axios.create({
    baseURL,
    ...baseConfig,
    ...config,
  });
  interceptUnAuthorizedRequest(requestInstance);

  return requestInstance;
};
