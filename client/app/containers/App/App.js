/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';
import AuthPage from 'containers/AuthPage';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - CI-CD-@maxa"
      defaultTitle="CI-CD-@maxa"
    >
      <meta name="description" content="A PDP CI-CD-@maxa app" />
    </Helmet>
    <Header />
    <div className="app-wrapper__content">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/auth" component={AuthPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
    <Footer />
  </div>
);

export default App;
