export const ACTION_TYPES = {
  AUTH_REQUEST: 'Auth Request',
  AUTH_SUCCESS: 'Auth Success',
  AUTH_FAILURE: 'Auth Fail',
  AUTH_LOGOUT: 'Auth Logout',
  GET_CURRENT_USER_REQUEST: 'Get Current User',
  GET_CURRENT_USER_SUCCESS: 'Get Current User Success',
  GET_CURRENT_USER_FAILURE: 'Get Current User Failure',
};

export const initialAuthState = {
  payload: {
    isAuthenticated: false
  },
  error: null,
  loading: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.AUTH_REQUEST:
    case ACTION_TYPES.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };

    case ACTION_TYPES.AUTH_SUCCESS:
    case ACTION_TYPES.GET_CURRENT_USER_SUCCESS:
      return {
        payload: { ...action.payload, isAuthenticated: true },
        error: null,
        loading: false,
      };
    case ACTION_TYPES.AUTH_FAILURE:
      return { payload: initialAuthState.payload, error: action.payload, loading: false };

    case ACTION_TYPES.AUTH_LOGOUT:
      return initialAuthState;

    default:
      return initialAuthState;
  }
}
