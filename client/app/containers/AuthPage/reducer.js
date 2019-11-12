import * as actionTypes from './types';

export const initialState = {
  loading: false,
  error: false,
  payload: {
    isAuthenticated: false
  },
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.GET_CURRENT_USER_REQUEST:
    case actionTypes.REGISTER_REQUEST: {
      return { ...state, loading: true };
    }

    case actionTypes.GET_CURRENT_USER_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        payload: {
          isAuthenticated: true,
          ...action.payload
        },
      };
    }

    case actionTypes.GET_CURRENT_USER_FAILURE:
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.REGISTER_FAILURE: {
      return { ...state, error: action.payload.error, loading: false };
    }

    case actionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
}
