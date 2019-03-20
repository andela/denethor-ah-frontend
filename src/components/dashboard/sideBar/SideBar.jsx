import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './style.scss';

const SideBar = ({ authUserEmail = '' }) => {
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
          <li className='sidebar-links__item'>
            <NavLink to='/dashboard/bookmarked-articles'>Bookmarked Articles</NavLink>
            <div className='button_background' />
          </li>
          <li className='sidebar-links__item'>
            <NavLink to='/dashboard/topReads'>Top Reads</NavLink>
            <div className='button_background' />
          </li>
          <li className='sidebar-links__item'>
            <NavLink to='/dashboard/my-followers'>My Followers</NavLink>
            <div className='button_background' />
          </li>
          <li className='sidebar-links__item'>
            <NavLink to='/dashboard/my-publications'>My Publications</NavLink>
            <div className='button_background' />
          </li>
          <li className='sidebar-links__item'>
            <NavLink to='/dashboard/my-profile'>My Profile</NavLink>
            <div className='button_background' />
          </li>
          <li className='sidebar-links__item'>
            <NavLink to='/dashboard/edit-profile'>Edit Profile</NavLink>
            <div className='button_background' />
          </li>
          <li className='sidebar-links__item'>
            <NavLink to='/dashboard/reset-password'>Reset Password</NavLink>
            <div className='button_background' />
          </li>
        </ul>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  authUserEmail: PropTypes.string
};

export default SideBar;