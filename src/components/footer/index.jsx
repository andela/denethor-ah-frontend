import React from 'react';
import { withRouter } from 'react-router-dom';

import NavTab from '../navTabs';
import './style.scss';

export const Footer = () => (
  <footer>
    <div className="footer">
      <NavTab />
      <div className="footer__logo-button">
        <button className="footer__logo-button__button">
          <div className="footer__logo-button__logo">
            <img src='/assets/img/ah-logo.svg' alt="logo" />
          </div>
          <div><p>AUTHOR&apos;S HAVEN</p></div>
        </button>
      </div>
    </div>
    <div className="mini-footer">
      <span className="mini-footer__text">&copy; Authors Haven 2019</span>
    </div>
  </footer>
);

export default withRouter(Footer);