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
    const URL = '/api/products/get';

    return request(URL).then((products) => {
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    }, (error) => dispatch({ type: GET_PRODUCTS_FAILURE, payload: { error } }));
  };
}

export function addProduct(value) {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    const URL = '/api/products/create';
    const options = { method: 'POST', body: JSON.stringify({ name: value }) };

    return request(URL, options).then(({ name }) => {
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: { name } });
    }, (error) => dispatch({ type: ADD_PRODUCT_FAILURE, payload: { error } }));
  };
}
