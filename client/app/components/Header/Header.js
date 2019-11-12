import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { logout, isAuthenticated, userEmail } = this.props;

    return (
      <div className="header">
        <img
          className="header__logo"
          src="https://miro.medium.com/max/4000/1*TNJ7Rpr5G1OJHtKH-IBEFw.png"
          alt="logo"
        />
        <div> -
          {isAuthenticated ? (
            <div>
              <span className="header__name">User: {userEmail}</span>
              <button
                onClick={() => logout()}
                type="button"
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userEmail: PropTypes.string,
};

export default Header;
