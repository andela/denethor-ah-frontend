import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import NotificationWidget from '../notificationWidget/NotificationWidget';
import PropTypes from 'prop-types';
import axios from '../../utils/axiosConfig';
import './styles.scss';
import { logout } from '../../redux/actions/auth';
import { removeOwnProfile } from '../../redux/actions/profile';
import { toggleMobileSideBar } from '../../redux/actions/elements';
import MobileSideBar from '../dashboard/sideBar/MobileSideBar';

library.add(faBars);

export let Header = ({ history, dispatch, isLoggedIn, toggleMobileSideBar, sideBarActive }) => {
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
    dispatch(removeOwnProfile());
    history.push('/');
  };

  const handleLogoClick = () => {
    history.push('/');
  };

  const theme = 'theme__black';

  let fontColors = {
    theme__black: '#ffffff'
  };

  const iconColor = fontColors[theme];

  return (
    <div className={`header ${theme}`}>
      <button onClick={handleLogoClick} className='logo-container show-for-large'>
        <div className="logo-image">
          <img src='/assets/img/ah-logo.svg' alt="Author's haven logo"/>
        </div>
        <div className="logo-text">
          <h3>AUTHOR&apos;S HAVEN</h3>
        </div>
      </button>
      <div className="nav-container show-for-large">
        <ul>
          {
            isLoggedIn
            ?
            <React.Fragment>
              <li><NotificationWidget handleLogout={handleNavLogout} /></li>
            </React.Fragment>
            :
            <React.Fragment>
              <li><button onClick={handleNavSignup} className="signup-link">Signup</button></li>
              <li><button onClick={handleNavLogin} className="login-link">Login</button></li>
            </React.Fragment>
          }
        </ul>
      </div>
      <div className="mobile-header hide-for-large">
        <FontAwesomeIcon icon="bars" color={iconColor || '#818181'} size="2x" onClick={toggleMobileSideBar} />
        <Link to='/'>
          <div className="mobile-header-text"><h3>AUTHOR&apos;S HAVEN</h3></div>
        </Link>
        {isLoggedIn && <NotificationWidget handleLogout={handleNavLogout} />}

      </div>

      <MobileSideBar 
        isLoggedIn={isLoggedIn} 
        handleNavLogout={handleNavLogout}
        handleNavSignup={handleNavSignup} 
        handleNavLogin={handleNavLogin}
        sideBarActive={sideBarActive}
        toggleMobileSideBar={toggleMobileSideBar}
      />
    </div>
  )
};

Header.propTypes={
  dispatch: PropTypes.func,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  toggleMobileSideBar: PropTypes.func,
  sideBarActive: PropTypes.bool
}

Header = withRouter(Header);

const mapStateToProps = ({ auth: { isLoggedIn = false }, elementStatuses: { sideBarActive = false } }) => 
  ({ isLoggedIn, sideBarActive });

const mapDispatchToProps = (dispatch) => ({
  toggleMobileSideBar: () => dispatch(toggleMobileSideBar()),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
