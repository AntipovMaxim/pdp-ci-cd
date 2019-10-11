import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { loadProducts } from './actions';
import HomePage from './HomePage';
import { selectProductsList, selectProductsLoading } from './selectors';

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(loadProducts()),
});

const mapStateToProps = createStructuredSelector({
  products: selectProductsList(),
  loading: selectProductsLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomePage);
