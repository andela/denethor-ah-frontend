import React from 'react';
import PropTypes from 'prop-types';

import NavTab from '../navTabs';
import InputSection from '../inputSection';
import logo from '../../images/ah-logo.svg';
import './style.scss';

const Footer = ({ onChange, onKeyPress }) => (
  <footer>
    <div className="footer">
      <div className="footer__search-section">
        <div className="footer__search-section__search-text">
          <span>Search Articles</span>
        </div>
        <InputSection
          type="text"
          placeHolder="Author's name, title or tag"
          className="footer__search-section__search-input"
          onChange={onChange}
          onKeyPress={onKeyPress}
          id="searchInput"
        />
      </div>
      <NavTab />
      <div className="footer__logo-button">
        <button className="footer__logo-button__button"><div className="footer__logo-button__logo"><img src={`/${logo}`} alt="logo" /></div><div><p>AUTHOR&apos;S HAVEN</p></div></button>
      </div>
    </div>
    <div className="mini-footer">
      <span className="mini-footer__text">&copy; Authors Haven 2019</span>
    </div>
  </footer>
);

Footer.propTypes={
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
}

export default Footer;