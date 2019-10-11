import {
  ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from 'containers/HomePage/constants';

export const initialState = {
  loading: false,
  error: false,
  payload: [],
};

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
    case ADD_PRODUCT_REQUEST: {
      return { ...state, loading: true };
    }
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        payload: action.payload,
      };
    }

    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        payload: [action.payload, ...state.payload],
      };
    }

    case DELETE_PRODUCT_SUCCESS: {
      const { id } = action.payload;
      const payload = state.payload.filter((product) => product.id !== id);
      return {
        ...state,
        loading: false,
        error: false,
        payload,
      };
    }

    case DELETE_PRODUCT_FAILURE:
    case GET_PRODUCTS_FAILURE: {
      return { ...state, error: action.payload.error, loading: false };
    }
    default:
      return state;
  }
}
