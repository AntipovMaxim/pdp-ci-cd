import { useReducer } from 'react';

import { ACTION_TYPES, initialProductsState, productsReducer } from './reducer';
import { api } from '../api';


export const useProducts = () => {
  const [products, dispatch] = useReducer(productsReducer, initialProductsState);

  const loadProducts = async () => {
    dispatch({ type: ACTION_TYPES.ADD_PRODUCT_REQUEST });
    try {
      const { data } = await api.get('/products');
      dispatch({
        type: ACTION_TYPES.GET_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.GET_PRODUCTS_FAILURE,
        payload: error.response.data,
      });
    }
  };

  const addProduct = async (name) => {
    dispatch({ type: ACTION_TYPES.ADD_PRODUCT_REQUEST });

    try {
      const { data } = await api.post('/products', { name });
      dispatch({
        type: ACTION_TYPES.ADD_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.ADD_PRODUCT_FAILURE,
        payload: error.response.data,
      });
    }
  };

  const updateProduct = async ({ id, name }) => {
    dispatch({ type: ACTION_TYPES.UPDATE_PRODUCT_REQUEST });

    try {
      const { data } = await api.put(`/products/${id}`, { name });
      dispatch({
        type: ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE,
        payload: error.response.data,
      });
    }
  };

  const deleteProduct = async (id) => {
    dispatch({ type: ACTION_TYPES.DELETE_PRODUCT_REQUEST });

    try {
      await api.delete(`/products/${id}`);
      dispatch({
        type: ACTION_TYPES.DELETE_PRODUCT_SUCCESS,
        payload: { id },
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE,
        payload: error.response.data,
      });
    }
  };

  return {
    data: products,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
