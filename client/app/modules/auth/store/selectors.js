import { createSelector } from 'reselect';

const selectAuthRoot = (state) => state.auth;

export const selectAuthPayload = createSelector(
  selectAuthRoot,
  (state) => state.payload,
);

export const selectAuthLoading = createSelector(
  selectAuthRoot,
  (state) => state.loading,
);

export const selectIsAuthenticated = createSelector(
  selectAuthPayload,
  (state) => state.isAuthenticated,
);

export const selectUserEmail = createSelector(
  selectAuthPayload,
  (state) => state.email,
);
