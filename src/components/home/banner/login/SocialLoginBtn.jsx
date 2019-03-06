import React from 'react';

import './styles.scss';
const backend = process.env.API_ROOT_URL;
const SocialLoginBtn = () => (
  <div className='social-login-block'>
    <p>Login with Social Media</p>
    <a href={`${backend}/users/google`}>
      <button className='button button--google'>Google</button>
    </a>
    <a href={`${backend}/users/facebook`}>
      <button className='button button--facebook'>Facebook</button>
    </a>
    <a href={`${backend}/users/twitter`}>
      <button className='button button--twitter'>Twitter</button>
    </a>
  </div>
);

export default SocialLoginBtn;
