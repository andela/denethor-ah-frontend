import React from 'react';
import logo from '../../../public/assets/img/ah-logo.svg';
import { Link } from 'react-router-dom';
import searchIcon from '../../../public/assets/img/search-icon.svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

library.add(faBars);

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <div className="logo-image"> 
          <img src={logo} alt="Author's haven logo"/>
        </div>
        <div className="logo-text">
          <h3>AUTHOR&apos;S HAVEN</h3>
        </div>
      </div>
      <div className="nav-container">
        <ul>
          <li><Link to='/'><img src={searchIcon} alt="search icon"/></Link></li>
          <li><Link to='/' className="signup-link">Signup</Link></li>
          <li><Link to='/' className="login-link">Login</Link></li>
        </ul>
      </div>
      <div className="mobile-header"> 
        <FontAwesomeIcon icon="bars" color="#818181" size="2x"/>
        <div className="mobile-header-text"><h3>AUTHOR&apos;S HAVEN</h3></div>
        <div className="mobile-header-search-icon"><img src={searchIcon} alt="Mobile view search icon"/></div>
      </div>
    </div>
  )
}

export default Header;