import request from 'utils/request';
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from 'containers/HomePage/constants';


function getProductsRequest() {
  return { type: GET_PRODUCTS_REQUEST };
}

function getProductsSuccess(products) {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: products,
  };
}

function getProductsFailure(error) {
  return {
    type: GET_PRODUCTS_FAILURE,
    payload: { error },
  };
}

export function loadProducts() {
  return (dispatch) => {
    dispatch(getProductsRequest());
    const URL = 'https://api.github.com/users/martmax/repos?type=all&sort=updated';
    return request(URL).then((products) => {
      console.warn(products);
      dispatch(getProductsSuccess(products));
    }, (error) => dispatch(getProductsFailure(error)));
  };
}
