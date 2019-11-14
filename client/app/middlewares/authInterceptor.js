import get from 'lodash/get';

import { logout } from '../containers/AuthPage/actions';

export const authInterceptor = ({ dispatch }) => (next) => (action) => {
  const responseStatus = get(action, 'payload.error.status', 200);
  if (responseStatus === 401 || responseStatus === 403) {
    dispatch(logout());
  } else {
    next(action);
  }
};
