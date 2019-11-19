/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../../shared/utils/history';
import { productReducer } from '../../modules/products/store/reducer';
import { authReducer } from '../../modules/auth/store/reducer';

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
