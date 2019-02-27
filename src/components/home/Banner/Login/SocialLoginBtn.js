import React from 'react';

import './styles.scss';

const SocialLoginBtn = () => (
  <div className='social-login-block'>
    <p>Login with Social Media</p>
    <button className='button button--google'>Google</button>
    <button className='button button--facebook'>Facebook</button>
    <button className='button button--twitter'>Twitter</button>
  </div>
);

export default SocialLoginBtn;