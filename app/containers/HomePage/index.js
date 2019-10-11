import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { loadProducts, addProduct, deleteProduct } from './actions';
import HomePage from './HomePage';
import { selectProductsList, selectProductsLoading } from './selectors';

const mapDispatchToProps = {
  loadProducts,
  addProduct,
  deleteProduct,
};

const mapStateToProps = createStructuredSelector({
  products: selectProductsList(),
  loading: selectProductsLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);
