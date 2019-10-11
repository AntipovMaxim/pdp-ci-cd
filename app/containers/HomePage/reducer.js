import {
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
    case GET_PRODUCTS_REQUEST: {
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

    case GET_PRODUCTS_FAILURE: {
      return { ...state, error: action.payload.error, loading: false };
    }
    default:
      return state;
  }
}
