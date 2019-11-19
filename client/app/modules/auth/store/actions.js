import { push } from 'connected-react-router';

import request from '../../../shared/utils/request';
import * as actionTypes from './types';
import { apiConfig } from '../../../core/config/apiConfig';
import { UserStorage } from '../../../shared/services/storages/UserStorage';


export function register({ password, email }) {
  return (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    const URL = `${apiConfig.AUTH_API_URL}/auth/register`;
    const options = { method: 'POST', body: JSON.stringify({ email, password }) };

    return request(URL, options).then((user) => {
      UserStorage.setAuthorization(user.token);
      dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: user });
      dispatch(push('/'));
    }, ({ response }) => dispatch({ type: actionTypes.REGISTER_FAILURE, payload: { error: response } }));
  };
}


export function login({ password, email }) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    const URL = `${apiConfig.AUTH_API_URL}/auth/login`;
    const options = { method: 'POST', body: JSON.stringify({ email, password }) };

    return request(URL, options).then((user) => {
      UserStorage.setAuthorization(user.token);
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: user });
      dispatch(push('/'));
    }, ({ response }) => dispatch({ type: actionTypes.LOGIN_FAILURE, payload: { error: response } }));
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(push('/auth'));
    UserStorage.removeAuthorization();

    return dispatch({ type: actionTypes.LOGOUT });
  };
}

export function getCurrentUser() {
  return (dispatch) => {
    dispatch({ type: actionTypes.GET_CURRENT_USER_REQUEST });
    const URL = `${apiConfig.AUTH_API_URL}/auth/current`;

    return request(URL).then((user) => {
      dispatch({ type: actionTypes.GET_CURRENT_USER_SUCCESS, payload: user });
    }, ({ response }) => dispatch({ type: actionTypes.GET_CURRENT_USER_FAILURE, payload: { error: response } }));
  };
}
