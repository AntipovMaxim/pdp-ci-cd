import { connect } from 'react-redux';
import { compose } from 'redux';

import App from './App';
import { logout, getCurrentUser } from '../AuthPage/actions';
import { selectIsAuthenticated, selectUserEmail } from '../AuthPage/selectors';

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
