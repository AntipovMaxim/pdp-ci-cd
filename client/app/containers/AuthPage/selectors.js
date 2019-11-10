import { createSelector } from 'reselect';

const selectAuthRoot = (state) => state.auth;

export const selectAuthPayload = () => createSelector(
  selectAuthRoot,
  (state) => state.payload,
);

export const selectAuthLoading = () => createSelector(
  selectAuthRoot,
  (state) => state.loading,
);
