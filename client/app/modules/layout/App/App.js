import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProductsPage from '../../products/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Header from '../Header';
import Footer from '../Footer';
import './style.scss';
import AuthPage from '../../auth/Loadable';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  }

  render() {
    const { isAuthenticated, logout, userEmail } = this.props;
    return (
      <div className="app-wrapper">
        <Helmet
          titleTemplate="%s - CI-CD-@maxa"
          defaultTitle="CI-CD-@maxa"
        >
          <meta
            name="description"
            content="A PDP CI-CD-@maxa app"
          />
        </Helmet>
        <Header
          userEmail={userEmail}
          logout={logout}
          isAuthenticated={isAuthenticated}
        />
        <div className="app-wrapper__content">
          <Switch>
            <Route
              exact
              path="/"
              component={ProductsPage}
            />
            <Route
              exact
              path="/auth"
              component={AuthPage}
            />
            <Route
              path=""
              component={NotFoundPage}
            />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  logout: PropTypes.func,
  getCurrentUser: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userEmail: PropTypes.string,
};

export default App;