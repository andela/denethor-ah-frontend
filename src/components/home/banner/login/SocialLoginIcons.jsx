import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';

import './styles.scss';

const SocialLoginIcons = () => (
  <div className='social-login-block-mobile'>
    <div className='social-login-block-mobile__caption'>
      <p>Signup with or <b className='font-gold'>Login</b></p>
    </div>
    <div className='social-login-block-mobile__buttons'>
      <button><FontAwesomeIcon icon={faGoogle} color='#fd2c27' /></button>
      <button><FontAwesomeIcon icon={faFacebookF} color='#4267b2' /></button>
      <button><FontAwesomeIcon icon={faTwitter} color='#1da1f2' /></button>
    </div>
  </div>
);

export default SocialLoginIcons;