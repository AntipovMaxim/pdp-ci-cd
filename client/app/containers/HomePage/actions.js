import request from 'utils/request';
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_SUCCESS,
} from 'containers/HomePage/types';
import { apiConfig } from '../../config/apiConfig';


export function loadProducts() {
  return (dispatch) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const URL = `${apiConfig.PRODUCTS_API_URL}/products`;

    return request(URL).then((products) => {
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    }, ({ response }) => dispatch({ type: GET_PRODUCTS_FAILURE, payload: { error: response } }));
  };
}

export function addProduct(value) {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT_REQUEST });
    const URL = `${apiConfig.PRODUCTS_API_URL}/products`;
    const options = { method: 'POST', body: JSON.stringify({ name: value }) };

    return request(URL, options).then((product) => {
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: product });
    }, ({ response }) => dispatch({ type: ADD_PRODUCT_FAILURE, payload: { error: response } }));
  };
}

export function deleteProduct(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const URL = `${apiConfig.PRODUCTS_API_URL}/products/${id}`;
    const options = { method: 'DELETE' };

    return request(URL, options).then(() => {
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: { id } });
    }, ({ response }) => dispatch({ type: DELETE_PRODUCT_FAILURE, payload: { error: response } }));
  };
}

export function updateProduct(product) {
  return (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    const URL = `${apiConfig.PRODUCTS_API_URL}/products/${product.id}`;
    const options = { method: 'PUT', body: JSON.stringify({ name: product.name }) };

    return request(URL, options).then((response) => {
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response });
    }, ({ response }) => dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: { error: response } }));
  };
}
