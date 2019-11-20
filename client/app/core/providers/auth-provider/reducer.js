export const ACTION_TYPES = {
  AUTH_REQUEST: 'Auth Request',
  AUTH_SUCCESS: 'Auth Success',
  AUTH_FAILURE: 'Auth Fail',
  AUTH_LOGOUT: 'Auth Logout',
};

export const initialAuthState = { payload: null, error: null, loading: false };

export function authReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.AUTH_REQUEST:
      return { payload: null, error: null, loading: true };
    case ACTION_TYPES.AUTH_SUCCESS:
      return { payload: action.payload, error: null, loading: false };
    case ACTION_TYPES.AUTH_FAILURE:
      return { payload: state.payload, error: action.payload, loading: false };

    case ACTION_TYPES.AUTH_LOGOUT:
      return initialAuthState;

    default:
      return initialAuthState;
  }
}
