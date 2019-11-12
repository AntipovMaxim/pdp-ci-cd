import { connect } from 'react-redux';
import { compose } from 'redux';

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

const mapStateToProps = (state) => ({
  loading: selectAuthLoading(state),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AuthPage);
