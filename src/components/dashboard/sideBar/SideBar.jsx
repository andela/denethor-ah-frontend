import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './style.scss';

const SideBar = ({ authUserEmail = '', history }) => {
  const linkItemIsActive = (linkItem) => {
    const { location: { pathname } } = history;
    if(pathname.indexOf(linkItem) !== -1) {
      return true;
    }
    return false;
  }

  const links = {
    '/create-article': 'Create Article',
    '/dashboard/bookmarked-articles': 'Bookmarked Articles',
    '/dashboard/my-followers': 'My Followers',
    '/dashboard/my-publications': 'My Publications',
    '/dashboard/my-profile': 'My Profile',
    '/dashboard/edit-profile': 'Edit Profile',
  };

  const navLinks = Object.keys(links).map((linkKey) => {
    const linkText = links[linkKey];
    const linkFocusStatus = linkItemIsActive(linkKey) ? ' active' : ' inactive';

    return (
      <li key={linkKey} className={`sidebar-links__item${linkFocusStatus}`}>
        <NavLink to={linkKey}>{linkText}</NavLink>
        <div className='button_background' />
      </li>
    );
  })


  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-header__bold-text large-text'>
          <NavLink to='/dashboard'>Dashboard</NavLink>
        </div>
        <div className='sidebar-header__light-text'>Manage your account</div>
        <div className='sidebar-header__bold-text small-text'>{authUserEmail}</div>
      </div>
      <div className='sidebar-links'>
        <ul>
          {navLinks}
        </ul>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  authUserEmail: PropTypes.string,
  history: PropTypes.object,
};

export default SideBar;