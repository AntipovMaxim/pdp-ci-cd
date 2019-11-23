export const ACTION_TYPES = {
  GET_PRODUCTS_REQUEST: 'HOME/get products request',
  GET_PRODUCTS_SUCCESS: 'HOME/get products success',
  GET_PRODUCTS_FAILURE: 'HOME/get products failure',

  ADD_PRODUCT_REQUEST: 'HOME/add product request',
  ADD_PRODUCT_SUCCESS: 'HOME/add product success',
  ADD_PRODUCT_FAILURE: 'HOME/add product failure',

  DELETE_PRODUCT_REQUEST: 'HOME/delete product request',
  DELETE_PRODUCT_SUCCESS: 'HOME/delete product success',
  DELETE_PRODUCT_FAILURE: 'HOME/delete product failure',

  UPDATE_PRODUCT_REQUEST: 'HOME/update product request',
  UPDATE_PRODUCT_SUCCESS: 'HOME/update product success',
  UPDATE_PRODUCT_FAILURE: 'HOME/update product failure',
};

export const initialProductsState = {
  loading: false,
  error: false,
  payload: [],
};

export function productsReducer(state = initialProductsState, action) {
  switch (action.type) {
    case ACTION_TYPES.GET_PRODUCTS_REQUEST:
    case ACTION_TYPES.ADD_PRODUCT_REQUEST: {
      return { ...state, loading: true };
    }
    case ACTION_TYPES.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        payload: action.payload,
      };
    }

    case ACTION_TYPES.ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        payload: [action.payload, ...state.payload],
      };
    }

    case ACTION_TYPES.DELETE_PRODUCT_SUCCESS: {
      const { id } = action.payload;
      const payload = state.payload.filter((product) => product.id !== id);
      return {
        ...state,
        loading: false,
        error: false,
        payload,
      };
    }

    case ACTION_TYPES.UPDATE_PRODUCT_SUCCESS: {
      const { id } = action.payload;
      const payload = state.payload.map((product) => {
        if (product.id === id) {
          return action.payload;
        }

        return product;
      });

      return {
        ...state,
        loading: false,
        error: false,
        payload,
      };
    }

    case ACTION_TYPES.UPDATE_PRODUCT_FAILURE:
    case ACTION_TYPES.DELETE_PRODUCT_FAILURE:
    case ACTION_TYPES.GET_PRODUCTS_FAILURE: {
      return { ...state, error: action.payload.error, loading: false };
    }
    default:
      return state;
  }
}
