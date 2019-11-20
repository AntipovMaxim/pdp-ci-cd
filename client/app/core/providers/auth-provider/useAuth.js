import {
  useContext,
  createContext,
  useReducer,
} from 'react';
import axios from 'axios';

import { authReducer, initialAuthState, ACTION_TYPES } from './reducer';
import { apiConfig } from '../../config/apiConfig';
import { UserStorage } from '../../../shared/services/storages/UserStorage';
import { useRouter } from '../../../shared/hooks/useRouter';

export const authContext = createContext();

export const useAuth = () => useContext(authContext);

export function useProvideAuth() {
  const [user, dispatch] = useReducer(authReducer, initialAuthState);
  const router = useRouter();

  const httpRequest = axios.create({
    baseURL: `${apiConfig.AUTH_API_URL}/auth`,
  });

  const handleSuccess = (data) => {
    UserStorage.setAuthorization(data.token);
    dispatch({ type: ACTION_TYPES.AUTH_SUCCESS, payload: data });
    router.push('/');
  };

  const login = async (email, password) => {
    dispatch({ type: ACTION_TYPES.AUTH_REQUEST });

    try {
      const { data } = await httpRequest.post('/login', { email, password });
      handleSuccess(data);
    } catch (error) {
      dispatch({ type: ACTION_TYPES.AUTH_FAILURE, payload: error.response.data });
    }
  };

  const register = async (email, password) => {
    dispatch({ type: ACTION_TYPES.AUTH_REQUEST });

    try {
      const { data } = await httpRequest.post('/register', { email, password });
      handleSuccess(data);
    } catch (error) {
      dispatch({ type: ACTION_TYPES.AUTH_FAILURE, payload: error.response.data });
    }
  };

  const getCurrentUser = async () => {
    dispatch({ type: ACTION_TYPES.GET_CURRENT_USER_REQUEST });
    const token = UserStorage.getAuthorization();

    try {
      const { data } = await httpRequest.get('/current', {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      dispatch({ type: ACTION_TYPES.GET_CURRENT_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.GET_CURRENT_USER_FAILURE, payload: error.response.data });
    }
  };

  const logout = () => {
    UserStorage.removeAuthorization();
    dispatch({ type: ACTION_TYPES.AUTH_LOGOUT });
    router.push('/auth');
  };

  return {
    user,
    login,
    register,
    logout,
    getCurrentUser,
  };
}
