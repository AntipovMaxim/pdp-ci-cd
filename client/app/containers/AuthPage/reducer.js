import * as actionTypes from './types';

export const initialState = {
  loading: false,
  error: false,
  payload: [],
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.REGISTER_REQUEST: {
      return { ...state, loading: true };
    }

    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        payload: action.payload,
      };
    }

    case actionTypes.LOGIN_FAILURE:
    case actionTypes.REGISTER_FAILURE: {
      return { ...state, error: action.payload.error, loading: false };
    }
    default:
      return state;
  }
}
