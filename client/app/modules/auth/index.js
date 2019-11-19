import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  register,
  login,
} from './store/actions';
import AuthPage from './components/auth-page/AuthPage';
import { selectAuthLoading } from './store/selectors';

const mapDispatchToProps = {
  register,
  login,
};

const mapStateToProps = (state) => ({
  loading: selectAuthLoading(state),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AuthPage);
