import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/ah-logo.svg';
import searchIcon from '../../images/search-icon.svg';
import './styles.scss';

library.add(faBars);

export const Header = ({ handleLogin, handleSignup, loadStats, history }) => {
  const handleNavSignup = () => {
    if(history.location.pathname === '/') {
      handleSignup();
    }
  };

  const handleNavLogin = () => {
    if(history.location.pathname === '/') {
      handleLogin();
    }
  };

  const handleLogoClick = () => {
    if(history.location.pathname === '/') {
      return loadStats();
    }
    history.push('/');
  }

  return (
    <div className="header">
      <button onClick={handleLogoClick}>
        <div className="logo-container">
          <div className="logo-image"> 
            <img src={`/${logo}`} alt="Author's haven logo"/>
          </div>
          <div className="logo-text">
            <h3>AUTHOR&apos;S HAVEN</h3>
          </div>
        </div>
      </button>
      <div className="nav-container">
        <ul>
          <li><Link to='/'><img src={`/${searchIcon}`} alt="search icon"/></Link></li>
          <li><button onClick={handleNavSignup} className="signup-link">Signup</button></li>
          <li><button onClick={handleNavLogin} className="login-link">Login</button></li>
        </ul>
      </div>
      <div className="mobile-header"> 
        <FontAwesomeIcon icon="bars" color="#818181" size="2x"/>
        <div className="mobile-header-text"><h3>AUTHOR&apos;S HAVEN</h3></div>
        <div className="mobile-header-search-icon"><img src='/assets/img/search-icon.svg' alt="Mobile view search icon"/></div>
      </div>
    </div>
  )
}

export default withRouter(Header);