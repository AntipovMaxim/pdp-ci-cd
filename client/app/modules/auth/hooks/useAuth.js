import {
  useContext,
  createContext,
  useReducer,
} from 'react';
import get from 'lodash/get';

import { authReducer, initialAuthState, ACTION_TYPES } from './reducer';
import { UserStorage } from '../../../shared/services/storages/UserStorage';
import { useRouter } from '../../../shared/hooks/useRouter';
import { apiAuth, apiUsers } from '../api';


export const authContext = createContext();

export const useAuth = () => useContext(authContext);

export function useProvideAuth() {
  const [user, dispatch] = useReducer(authReducer, initialAuthState);
  const router = useRouter();

  const handleSuccess = (data) => {
    const setAuthToken = new Promise(((resolve) => {
      UserStorage.removeAuthorization();
      UserStorage.setAuthorization(data.token);
      const token = UserStorage.getAuthorization();
      console.warn(token);
      resolve(token);
    }));
    setAuthToken.then(() => {
      dispatch({ type: ACTION_TYPES.AUTH_SUCCESS, payload: data });
      router.push('/');
    });
  };

  const login = async (email, password) => {
    dispatch({ type: ACTION_TYPES.AUTH_REQUEST });

    try {
      const { data } = await apiAuth.post('/auth/login', { email, password });
      handleSuccess(data);
    } catch (error) {
      dispatch({ type: ACTION_TYPES.AUTH_FAILURE, payload: error.response.data });
    }
  };

  const register = async (email, password) => {
    dispatch({ type: ACTION_TYPES.AUTH_REQUEST });

    try {
      const { data } = await apiAuth.post('/auth/register', { email, password });
      handleSuccess(data);
    } catch (error) {
      dispatch({ type: ACTION_TYPES.AUTH_FAILURE, payload: error.response.data });
    }
  };

  const getCurrentUser = async () => {
    dispatch({ type: ACTION_TYPES.GET_CURRENT_USER_REQUEST });

    try {
      const { data } = await apiUsers.get('/auth/current');
      dispatch({ type: ACTION_TYPES.GET_CURRENT_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.GET_CURRENT_USER_FAILURE, payload: get(error, 'response.data', {}) });
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
