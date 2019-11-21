import { useReducer } from 'react';

import axios from 'axios';
import { apiConfig } from '../../../core/config/apiConfig';
import { UserStorage } from '../../../shared/services/storages/UserStorage';
import { productsReducer, initialProductsState, ACTION_TYPES } from './reducer';


export const useProducts = () => {
  const [products, dispatch] = useReducer(productsReducer, initialProductsState);
  const token = UserStorage.getAuthorization();

  const httpRequest = axios.create({
    baseURL: `${apiConfig.PRODUCTS_API_URL}`,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });


  const loadProducts = async () => {
    dispatch({ type: ACTION_TYPES.ADD_PRODUCT_REQUEST });

    try {
      const { data } = await httpRequest.get('/products');
      dispatch({ type: ACTION_TYPES.GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.GET_PRODUCTS_FAILURE, payload: error.response.data });
    }
  };

  const addProduct = async (name) => {
    dispatch({ type: ACTION_TYPES.ADD_PRODUCT_REQUEST });

    try {
      const { data } = await httpRequest.post('/products', { name });
      dispatch({ type: ACTION_TYPES.ADD_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.ADD_PRODUCT_FAILURE, payload: error.response.data });
    }
  };

  const updateProduct = async ({ id, name }) => {
    dispatch({ type: ACTION_TYPES.UPDATE_PRODUCT_REQUEST });

    try {
      const { data } = await httpRequest.put(`/products/${id}`, { name });
      dispatch({ type: ACTION_TYPES.UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE, payload: error.response.data });
    }
  };

  const deleteProduct = async (id) => {
    dispatch({ type: ACTION_TYPES.DELETE_PRODUCT_REQUEST });

    try {
      await httpRequest.delete(`/products/${id}`);
      dispatch({ type: ACTION_TYPES.DELETE_PRODUCT_SUCCESS, payload: { id } });
    } catch (error) {
      dispatch({ type: ACTION_TYPES.UPDATE_PRODUCT_FAILURE, payload: error.response.data });
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
