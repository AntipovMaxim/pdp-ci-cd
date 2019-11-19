import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  loadProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from './store/actions';
import ProductsPage from './components/products-page/ProductsPage';
import { selectProductsList, selectProductsLoading } from './store/selectors';

const mapDispatchToProps = {
  loadProducts,
  addProduct,
  deleteProduct,
  updateProduct,
};

const mapStateToProps = createStructuredSelector({
  products: selectProductsList(),
  loading: selectProductsLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProductsPage);
