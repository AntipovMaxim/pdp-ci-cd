/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import { productReducer } from 'containers/HomePage/reducer';
import { authReducer } from 'containers/AuthPage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    products: productReducer,
    auth: authReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  return rootReducer;
}
