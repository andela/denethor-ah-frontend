import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './styles.scss';

library.add(faBars);

export const Header = ({ history }) => {
  const handleNavSignup = () => {
      history.push('/signup');
  };

  const handleNavLogin = () => {
      history.push('/login');
  };

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className="header theme__black">
      <button onClick={handleLogoClick}>
        <div className="logo-container">
          <div className="logo-image"> 
            <img src='/assets/img/ah-logo.svg' alt="Author's haven logo"/>
          </div>
          <div className="logo-text">
            <h3>AUTHOR&apos;S HAVEN</h3>
          </div>
        </div>
      </button>
      <div className="nav-container">
        <ul>
          <li><Link to='/'><img src='/assets/img/search-icon.svg' alt="search icon"/></Link></li>
          <li><button onClick={handleNavSignup} className="signup-link">Signup</button></li>
          <li><button onClick={handleNavLogin} className="login-link">Login</button></li>
        </ul>
      </div>
      <div className="mobile-header"> 
      <FontAwesomeIcon icon="bars" color="#818181" size="2x"/>
        <Link to='/'>
          <div className="mobile-header-text"><h3>AUTHOR&apos;S HAVEN</h3></div>
        </Link>
        <div className="mobile-header-search-icon"><img src='/assets/img/search-icon.svg' alt="Mobile view search icon"/></div>
      </div>
    </div>
  )
};

Header.propTypes={
  history: PropTypes.object
}

export default withRouter(Header);
