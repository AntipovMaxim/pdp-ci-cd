import { connect } from 'react-redux';
import { compose } from 'redux';

import App from './App';
import { logout, getCurrentUser } from '../../auth/store/actions';
import { selectIsAuthenticated, selectUserEmail } from '../../auth/store/selectors';

const mapDispatchToProps = {
  logout,
  getCurrentUser,
};

const mapStateToProps = (state) => ({
  isAuthenticated: selectIsAuthenticated(state),
  userEmail: selectUserEmail(state),
});


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
