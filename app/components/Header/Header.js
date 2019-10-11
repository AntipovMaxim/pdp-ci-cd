import React from 'react';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <b>@maxa</b>
      </div>
    );
  }
}

export default Header;
