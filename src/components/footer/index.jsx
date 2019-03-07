import React from 'react';
import NavTab from '../navTabs';
import InputSection from '../inputSection';
import logo from '../../../public/assets/img/ah-logo.svg'

const Footer = () => (
  <footer>
    <div className="footer">
      <div className="footer__search-section">
        <div className="footer__search-section__search-text">
          <span>Search Articles</span>
        </div>
        <InputSection
          type="text"
          placeHolder="Introduction to writing"
          className="footer__search-section__search-input"
        />
      </div>
      <NavTab />
      <div className="footer__logo-button">
        <div className="footer__logo-button__button"><div className="footer__logo-button__logo"><img src={logo} alt="logo" /></div><div><p>AUTHOR&apos;S HAVEN</p></div></div>
      </div>
    </div>
    <div className="mini-footer">
      <span className="mini-footer__text">&copy; Authors Haven 2019</span>
    </div>
  </footer>
);

export default Footer;