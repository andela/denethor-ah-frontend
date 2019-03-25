import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MobileSideBar = ({ 
  isLoggedIn, 
  handleNavLogout, 
  handleNavLogin, 
  handleNavSignup, 
  toggleMobileSideBar,
  sideBarActive
}) => {
  
  const loginButton = <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
    <button onClick={handleNavLogin}>Login</button>
    <div className='button_background' />
  </li>

  const signupButton = <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
    <button onClick={handleNavSignup}>Signup</button>
    <div className='button_background' />
  </li>

   const logoutButton = <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
      <button onClick={handleNavLogout}>Logout</button>
    <div className='button_background' />
  </li>
  

  const sidebarStatus = sideBarActive ? ' sidebar__active' : ' sidebar__inactive';

  const GeneralSidebar = () => {
    return (
      <div className={`mobile-sidebar${sidebarStatus}`}>
        <div className='sidebar-header'>
          <div className='sidebar-header__bold-text large-text' onClick={toggleMobileSideBar}>
            <NavLink to='/dashboard'>Authors Haven</NavLink>
          </div>
          {<br />}
          <FontAwesomeIcon icon={faTimes} color="#818181" size="2x" onClick={toggleMobileSideBar} />
        </div>
        <div className=''>
          <ul>
            <li className='sidebar-links__item'>
              <NavLink to='/articles/create'>Create Article</NavLink>
              <div className='button_background' />
            </li>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <NavLink to='/articles'>Search Articles</NavLink>
              <div className='button_background' />
            </li>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <NavLink to='/topReads'>Top Reads</NavLink>
              <div className='button_background' />
            </li>

            { !isLoggedIn && signupButton }
            { !isLoggedIn && loginButton }
            { isLoggedIn && logoutButton }
            
          </ul>
        </div>
      </div>
    )
  }

  const AuthUserSidebar = () => {
    return (
      <div className={`hide-for-large mobile-sidebar${sidebarStatus}`}>
        <div className='sidebar-header'>
          <div className='sidebar-header__bold-text large-text' onClick={toggleMobileSideBar}>
            <NavLink to='/dashboard'>Dashboard</NavLink>
          </div>
          <div className='sidebar-header__light-text'>Manage your account</div>
          <div className='sidebar-header__bold-text small-text'>email</div>
          <br/>
          <br/>
          <FontAwesomeIcon icon={faTimes} color="#818181" size="2x" onClick={toggleMobileSideBar} />
        </div>
        <div className='sidebar-links'>
          <ul>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <NavLink to='/create-article'>Create Article</NavLink>
              <div className='button_background' />
            </li>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <NavLink to='/dashboard/bookmarked-articles'>Bookmarked Articles</NavLink>
              <div className='button_background' />
            </li>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <NavLink to='/dashboard/topReads'>Top Reads</NavLink>
              <div className='button_background' />
            </li>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <NavLink to='/dashboard/my-followers'>My Followers</NavLink>
              <div className='button_background' />
            </li>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <NavLink to='/dashboard/my-publications'>My Publications</NavLink>
              <div className='button_background' />
            </li>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <NavLink to='/dashboard/my-profile'>My Profile</NavLink>
              <div className='button_background' />
            </li>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <NavLink to='/dashboard/edit-profile'>Edit Profile</NavLink>
              <div className='button_background' />
            </li>
            <li className='sidebar-links__item' onClick={toggleMobileSideBar}>
              <button onClick={handleNavLogout}>Logout</button>
              <div className='button_background' />
            </li>
          </ul>
        </div>
      </div>
    )
  }

  const sideBar = isLoggedIn ? AuthUserSidebar() : GeneralSidebar();

  return (
    <div>
      <div onClick={toggleMobileSideBar} className={`hide-for-large page-overlay${sidebarStatus}`}></div>
      {sideBar}
    </div>
  );
}

MobileSideBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleNavLogout: PropTypes.func.isRequired,
  handleNavSignup: PropTypes.func.isRequired,
  handleNavLogin: PropTypes.func.isRequired,
  toggleMobileSideBar: PropTypes.func.isRequired,
  sideBarActive: PropTypes.bool.isRequired,
}

export default MobileSideBar;