import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosConfig';
import './styles.scss';
import { logout } from '../../redux/actions/auth';

library.add(faBars);

export let Header = ({ history, dispatch, isLoggedIn }) => {
  const handleNavSignup = () => {
      history.push('/signup');
  };

  const handleNavLogin = () => {
      history.push('/login');
  };

  const handleNavLogout = async () => {
    await axios.get(`${process.env.API_ROOT_URL}/users/logout`);
    localStorage.clear();
    dispatch(logout());
    history.push('/');
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
          {
            isLoggedIn
            ? <li><button onClick={handleNavLogout} className="login-link">Logout</button></li>
            : <React.Fragment>
              <li><button onClick={handleNavSignup} className="signup-link">Signup</button></li>
              <li><button onClick={handleNavLogin} className="login-link">Login</button></li>
            </React.Fragment>
          }
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
  dispatch: PropTypes.func,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool
}

Header = withRouter(Header);

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({ isLoggedIn });

export default connect(mapStateToProps)(Header);
