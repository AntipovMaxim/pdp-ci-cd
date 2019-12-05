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

const interceptAuthRequests = (requestInstance) => {
  requestInstance.interceptors.request.use((config) => ({
    ...config,
    headers: {
      ...config.headers,
      ...getAuthHeader(),
    }
  }), (error) => Promise.reject(error));
};


export const apiClient = (baseURL, config = {}, isAuthHeader = true) => {
  const baseConfig = {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  };

  const requestInstance = axios.create({
    baseURL,
    ...baseConfig,
    ...config,
  });
  interceptUnAuthorizedRequest(requestInstance);

  if (isAuthHeader) {
    interceptAuthRequests(requestInstance);
  }

  return requestInstance;
};
