import React, { Component } from 'react';
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
import { toggleMobileSideBar } from '../../redux/actions/elements';
import MobileSideBar from '../dashboard/sideBar/MobileSideBar';
import { removeOwnProfile } from '../../redux/actions/profile';
import { SearchForm } from '../searchForm/SearchForm';

library.add(faBars);

export class Header extends Component {
  state = {
    theme: 'theme__black',
    fontColors: {
      theme__black: '#ffffff'
    },
    displaySearch: false
  }

  handleNavSignup = () => {
    const { props: { history } } = this; 
    history.push('/signup');
  };

  handleNavLogin = () => {
    const { props: { history } } = this; 
    history.push('/login');
  };

  handleNavLogout = async () => {
    const { props: { dispatch, history } } = this; 

    await axios.get(`${process.env.API_ROOT_URL}/users/logout`);
    localStorage.clear();
    dispatch(logout());
    dispatch(removeOwnProfile());
    history.push('/');
  };

  handleLogoClick = () => {
    const { props: { history } } = this; 
    history.push('/');
  };

  handleSearchDisplay = () => {
    this.setState((prevState) => ({ displaySearch: !prevState.displaySearch }))
  };

  render() {
    const { 
      props: { isLoggedIn, toggleMobileSideBar, sideBarActive }, 
      state: { theme, fontColors, displaySearch },
      handleLogoClick, handleNavLogin, handleNavLogout, handleNavSignup, handleSearchDisplay
    } = this

    return (
      <div className={`header ${theme}`}>
        <button onClick={handleLogoClick} className='logo-container show-for-large'>
          <div className="logo-image">
            <img src='/assets/img/ah-logo.svg' alt="Author's haven logo" />
          </div>
          <div className="logo-text">
            <h3>AUTHOR&apos;S HAVEN</h3>
          </div>
        </button>
        <div className="nav-container show-for-large">
          <ul>
            <li>
              <button onClick={handleSearchDisplay}>
                <img src='/assets/img/search-icon.svg' alt='ah-search-icon' />
              </button>
            </li>
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
          <FontAwesomeIcon icon="bars" color={fontColors[theme] || '#818181'} size="2x" onClick={toggleMobileSideBar} />
          <Link to='/'>
            <div className="mobile-header-text"><h3>AUTHOR&apos;S HAVEN</h3></div>
          </Link>
          {isLoggedIn && <NotificationWidget handleLogout={handleNavLogout} />}
        </div>
        <div className={`header__search ${displaySearch ? 'true' : 'false'}`}>
          <SearchForm />
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
  }
}

// { history, dispatch, isLoggedIn, toggleMobileSideBar, sideBarActive }

Header.propTypes={
  dispatch: PropTypes.func,
  history: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  toggleMobileSideBar: PropTypes.func,
  sideBarActive: PropTypes.bool
}

const mapStateToProps = ({ auth: { isLoggedIn = false }, elementStatuses: { sideBarActive = false } }) => 
  ({ isLoggedIn, sideBarActive });

const mapDispatchToProps = dispatch => ({
  toggleMobileSideBar: () => dispatch(toggleMobileSideBar())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
