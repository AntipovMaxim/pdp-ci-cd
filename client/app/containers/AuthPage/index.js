import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  register,
  login,
} from './actions';
import AuthPage from './AuthPage';
import { selectAuthLoading } from './selectors';

const mapDispatchToProps = {
  register,
  login,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AuthPage);
