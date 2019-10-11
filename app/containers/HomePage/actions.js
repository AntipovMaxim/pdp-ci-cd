import request from 'utils/request';
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE
} from 'containers/HomePage/constants';

export function loadProducts() {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const URL = 'https://api.github.com/users/martmax/repos?type=all&sort=updated';

    return request(URL).then((products) => {
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    }, (error) => dispatch({ type: GET_PRODUCTS_FAILURE, payload: { error } }));
  };
}

export function addProduct(name) {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    const URL = 'https://api.github.com/users/martmax/repos?type=all&sort=updated';
    const options = { method: 'POST', body: { name } };

    return request(URL, options).then(() => {
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: { name } });
    }, (error) => dispatch({ type: ADD_PRODUCT_FAILURE, payload: { error } }));
  };
}
