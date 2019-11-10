import request from 'utils/request';

import * as actionTypes from './types';

import { apiConfig } from '../../config/apiConfig';


export function register({ password, email }) {
  return (dispatch) => {
    dispatch({ type: actionTypes.REGISTER_REQUEST });
    const URL = `${apiConfig.AUTH_API_URL}/api/users`;
    const options = { method: 'POST', body: JSON.stringify({ user: { email, password } }) };

    return request(URL, options).then((data) => {
      dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: data });
    }, (error) => dispatch({ type: actionTypes.REGISTER_FAILURE, payload: { error } }));
  };
}


export function login({ password, email }) {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    const URL = `${apiConfig.AUTH_API_URL}/api/users/login`;
    const options = { method: 'POST', body: JSON.stringify({ user: { email, password } }) };

    return request(URL, options).then((data) => {
      dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data });
    }, (error) => dispatch({ type: actionTypes.LOGIN_FAILURE, payload: { error } }));
  };
}
