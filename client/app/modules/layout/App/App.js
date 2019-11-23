import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

import ProductsPage from '../../products/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import Header from '../Header';
import Footer from '../Footer';
import './style.scss';
import AuthPage from '../../auth/Loadable';
import { useAuth } from '../../auth/hooks/useAuth';

const App = () => {
  const auth = useAuth();
  const { logout, user, getCurrentUser } = auth;
  const { isAuthenticated, email } = user.payload;

  useEffect(() => {
    getCurrentUser();
  }, []);

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
        userEmail={email}
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
};


export default App;
