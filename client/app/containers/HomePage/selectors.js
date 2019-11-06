import { createSelector } from 'reselect';

const selectProductsRoot = (state) => state.products;

export const selectProductsList = () => createSelector(
  selectProductsRoot,
  (state) => state.payload,
);

export const selectProductsLoading = () => createSelector(
  selectProductsRoot,
  (state) => state.loading,
);
